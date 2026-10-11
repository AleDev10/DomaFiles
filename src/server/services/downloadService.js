import { downloadClient } from "../clients/downloadClient";

export async function downloadService(uri, tamanho) {
  try {
    const arquivoFile = await downloadClient(uri);

    if (!arquivoFile) {
      return null;
    }

    const handle = arquivoFile.open();
    const CHUNK_SIZE = 1024 * 1024;
    const chunks = [];

    let restante = tamanho;

    while (restante > 0) {
      const tamanhoChunk = Math.min(CHUNK_SIZE, restante);

      const bytes = await handle.readBytes(tamanhoChunk);
      chunks.push(bytes);

      restante -= bytes.length;
    }

    const resultado = new Uint8Array(tamanho);

    let offset = 0;

    for (const chunk of chunks) {
      resultado.set(chunk, offset);
      offset += chunk.length;
    }

    return {
      bytes: resultado,
    };
  } catch (error) {
    console.error("Erro ao tratar arquivo", error);
  }
}
