import { File } from "expo-file-system";

/**
 * Lê uma parte específica de um arquivo SAF.
 *
 * @param {string} uri - URI SAF do arquivo
 * @param {number} inicio - Byte inicial
 * @param {number} fim - Byte final
 *
 * @returns {Promise<Uint8Array> | null}
 */

export async function streamClient(uri, inicio, fim) {

  const arquivo = new File(uri);

  const tamanho = fim - inicio + 1;

  const handle = arquivo.open();

  try {
    handle.offset = inicio;

    const bytes = handle.readBytes(tamanho);

    return bytes;
  } finally {
    handle.close();
  }
}