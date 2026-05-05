import archiver from "archiver";
import { PassThrough, Readable } from "stream";

type ZipEntry = {
  link: string;
  label?: string | null;
};

export async function buildZipStream(zips: ZipEntry[]): Promise<PassThrough> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const passThrough = new PassThrough();

  archive.pipe(passThrough);

  for (const zip of zips) {
    if (!zip.link) continue;
    const res = await fetch(zip.link);
    if (!res.ok || !res.body) continue;
    archive.append(Readable.fromWeb(res.body as any), {
      name: zip.label ?? "file.zip",
    });
  }

  archive.finalize();
  return passThrough;
}
