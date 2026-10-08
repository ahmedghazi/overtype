import { client } from "@/app/sanity-api/sanity-client";
import { LinkExpire } from "@/app/types/schema";
import { buildZipStream } from "../lib/zip-archive";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return Response.json({ error: "Missing token" }, { status: 400 });
  }

  const data = await client.fetch<LinkExpire>(
    `*[_type == "linkExpire" && token == $token][0]{
      _id,
      zips[]{ _type, link, label },
      maxDownloads,
      downloads
    }`,
    { token } as Record<string, string>,
  );

  if (!data) {
    return Response.json({ error: "Invalid link" }, { status: 404 });
  }

  if (data.downloads != null && data.maxDownloads != null && data.downloads >= data.maxDownloads) {
    return Response.json({ error: "Download limit reached" }, { status: 410 });
  }

  if (!data.zips?.length) {
    return Response.json({ error: "No files found" }, { status: 404 });
  }

  const stream = await buildZipStream(
    data.zips.filter((zip): zip is typeof zip & { link: string } => !!zip.link),
  );

  await client.patch(data._id).inc({ downloads: 1 }).commit();

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="overtype-fonts.zip"',
      "Cache-Control": "no-store",
    },
  });
}
