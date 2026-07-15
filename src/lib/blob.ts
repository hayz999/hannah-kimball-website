import { put, del } from "@vercel/blob";

export async function uploadFile(file: File, prefix: string): Promise<string> {
  const blob = await put(`${prefix}/${crypto.randomUUID()}-${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

export async function deleteBlobIfManaged(url: string | null | undefined): Promise<void> {
  if (!url) return;
  try {
    await del(url);
  } catch {
    /* file may already be gone or not a blob URL */
  }
}
