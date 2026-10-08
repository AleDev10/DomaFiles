import { streamClient } from "../clients/streamClient";

/**
 * Prepara uma leitura parcial do arquivo para streaming.
 *
 * @param {string} uri
 * @param {number} inicio
 * @param {number} fim
 * @param {number} tamanhoTotal
 */

export async function streamService(
  uri,
  inicio,
  fim,
  tamanhoTotal
) {

  try {
    if (!uri) {
    console.error("URI do arquivo não informada");
    return null;
  }

  if (!Number.isInteger(tamanhoTotal) || tamanhoTotal <= 0) {
    console.error("Tamanho do arquivo inválido");
    return null;
  }

  if (!Number.isInteger(inicio) || inicio < 0) {
    console.error("Range inicial inválido");
    return null;
  }

  if (!Number.isInteger(fim) || fim < inicio) {
    console.error("Range final inválido");
    return null;
  }

  if (inicio >= tamanhoTotal) {
    console.error("Range fora dos limites do arquivo");
    return null;
  }

  const fimReal = Math.min(fim, tamanhoTotal - 1);

  const conteudo = await streamClient(uri,inicio,fimReal);

  return {
    inicio,
    fim: fimReal,
    tamanho: fimReal - inicio + 1,
    tamanhoTotal,
    conteudo,
  };
  } catch (error) {
    console.error("Erro ao tratar arquivo", error);
  }
}