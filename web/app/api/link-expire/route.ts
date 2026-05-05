import { Readable } from "stream";
import archiver from "archiver";
import { PassThrough } from "stream";
import { client } from "@/app/sanity-api/sanity-client";
import { LinkExpire } from "@/app/types/schema";

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

  const archive = archiver("zip", { zlib: { level: 9 } });
  const passThrough = new PassThrough();

  archive.pipe(passThrough);

  for (const zip of data.zips) {
    if (!zip.link) continue;
    const res = await fetch(zip.link);
    if (!res.ok || !res.body) continue;
    archive.append(Readable.fromWeb(res.body as any), {
      name: zip.label ?? "file.zip",
    });
  }

  archive.finalize();

  await client.patch(data._id).inc({ downloads: 1 }).commit();

  return new Response(passThrough as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="overtype-fonts.zip"',
      "Cache-Control": "no-store",
    },
  });
}
