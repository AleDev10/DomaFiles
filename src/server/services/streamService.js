import { streamClient } from "../clients/streamClient";

/**
 * Prepara uma leitura parcial do arquivo para streaming.
 *
 * @param {string} uri - URI file:// do arquivo
 * @param {number} inicio
 * @param {number} fim
 * @param {number} tamanhoTotal - Tamanho do arquivo
 */

export async function streamService(
  uri,
  inicio,
  fim,
  tamanhoTotal
) {

  try {
    if (
      !uri ||
      !Number.isSafeInteger(tamanhoTotal) ||
      tamanhoTotal <= 0 ||
      !Number.isSafeInteger(inicio) ||
      !Number.isSafeInteger(fim) ||
      inicio < 0 ||
      fim < inicio ||
      inicio >= tamanhoTotal
    ) {
      return null;
    }

  const fimReal = Math.min(fim, tamanhoTotal - 1);

  const conteudo = await streamClient(uri,inicio,fimReal);

  if (!conteudo) {
    return null;
  }

  return {
      inicio,
      fim: fimReal,
      tamanho: conteudo.byteLength,
      tamanhoTotal,
      conteudo,
    };
  } catch (error) {
    console.error("Erro ao tratar arquivo", error);
  }
}