import mammoth from "mammoth";

export async function extractDocxText(buffer: Buffer | ArrayBuffer): Promise<string> {
  const buf = buffer instanceof ArrayBuffer ? Buffer.from(buffer) : buffer;
  const result = await mammoth.extractRawText({ buffer: buf });
  return result.value;
}
