import { File } from "expo-file-system";

export async function arquivoURIClient(uri) {
  const arquivo = new File(uri);
  const handle = arquivo.open();

  try {
    const tamanho = handle.size ?? arquivo.size;

    if (tamanho === null || tamanho === undefined) {
      console.error("Tamanho não definido");
      return null;
    }

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
      tamanho,
    };
  } finally {
    handle.close();
  }
}