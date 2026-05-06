import { client } from "@/app/sanity-api/sanity-client";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 30_000;

const FULL_ORDER_QUERY = `*[_type == "order" && _id == $orderId][0]{
  _id,
  title,
  creationDate,
  status,
  totalAmount,
  invoiceNumber,
  licenseFor,
  licenseForData,
  user->{ _id, name, email },
  items[]->{ ..., downloadLink }
}`;

const freshClient = client.withConfig({ useCdn: false });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return new Response("Missing orderId", { status: 400 });
  }

  const encoder = new TextEncoder();
  let subscription: any;
  let timeoutId: ReturnType<typeof setTimeout>;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`),
          );
        } catch {
          // controller already closed
        }
      };

      const close = () => {
        clearTimeout(timeoutId);
        subscription?.unsubscribe();
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      const sendCompleted = async () => {
        const order = await freshClient.fetch(FULL_ORDER_QUERY, { orderId });
        send({ status: "completed", order });
        close();
      };

      // Use CDN-bypass for initial fetch so we always see the latest state
      const initial = await freshClient.fetch<{ status: string } | null>(
        `*[_type == "order" && _id == $orderId][0]{ status }`,
        { orderId },
      );

      if (initial) {
        if (initial.status === "completed") {
          await sendCompleted();
          return;
        }
        send({ status: initial.status });
      }

      timeoutId = setTimeout(() => {
        send({ error: "timeout" });
        close();
      }, TIMEOUT_MS);

      subscription = freshClient
        .listen(`*[_type == "order" && _id == $orderId]`, { orderId }, { visibility: "query" })
        .subscribe({
          next(update: any) {
            const doc = update.result;
            if (!doc) return;
            if (doc.status === "completed") {
              sendCompleted();
            } else {
              send({ status: doc.status });
            }
          },
          error() {
            send({ error: "listener_error" });
            close();
          },
        });
    },
    cancel() {
      clearTimeout(timeoutId);
      subscription?.unsubscribe();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
