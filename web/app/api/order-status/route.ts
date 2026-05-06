import { client } from "@/app/sanity-api/sanity-client";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 30_000;

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
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
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

      // Send current state immediately so the client doesn't wait for a mutation
      const initial = await client.fetch<{ status: string } | null>(
        `*[_type == "order" && _id == $orderId][0]{ status }`,
        { orderId }
      );

      if (initial) {
        send({ status: initial.status });
        if (initial.status === "completed") {
          close();
          return;
        }
      }

      // Hard timeout — tell client to show the contact-admin message
      timeoutId = setTimeout(() => {
        send({ error: "timeout" });
        close();
      }, TIMEOUT_MS);

      // Real-time listener — fires on every mutation to the order doc
      subscription = client
        .withConfig({ useCdn: false })
        .listen(`*[_type == "order" && _id == $orderId]`, { orderId })
        .subscribe({
          next(update: any) {
            const doc = update.result;
            if (!doc) return;
            send({ status: doc.status });
            if (doc.status === "completed") close();
          },
          error() {
            send({ error: "listener_error" });
            close();
          },
        });
    },
    cancel() {
      // Client disconnected
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
