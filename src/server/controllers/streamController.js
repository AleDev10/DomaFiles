import { streamService } from "../services/streamService";

/**
 * @typedef {Object} HttpResponse
 * @property {number} statusCode - Código de status HTTP.
 * @property {Object.<string, string>} headers - Cabeçalhos da resposta.
 * @property {string|Buffer|Uint8Array|ArrayBuffer} body - Corpo da resposta.
 */

/**
 * Controla a transmissão de um arquivo em blocos usando requisições HTTP
 * com `Range`.
 *
 * A função espera que os seguintes query params estejam presentes em
 * `req.path`:
 * - `uri`: URI do arquivo.
 * - `nome`: Nome do arquivo.
 * - `size`: Tamanho total do arquivo em bytes.
 * - `mimeType`: Tipo MIME do arquivo.
 *
 * @async
 * @function streamController
 *
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 *
 * @returns {Promise<HttpResponse>} Promise<HttpResponse>
 */

export async function streamController(req, res) {
  try {
    const path = req.path;
    const url = new URL(path, "http://localhost");
    const uri = url.searchParams.get("uri");
    const nome = url.searchParams.get("nome");
    const size = Number(url.searchParams.get("size"));
    const mimeType = url.searchParams.get("mimeType");
    const range = req.headers.range;

    if (!uri || !nome || !size || !mimeType) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Informaçoes do arquivo em falta",
        }),
      };
    }

    if (!range) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Range não informado",
        }),
      };
    }

    const match = range.match(/^bytes=(\d+)-(\d*)$/);

    if (!match) {
      return {
        statusCode: 416,
        headers: {
          "Content-Type": "application/json",
          "Content-Range": `bytes */${size}`,
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Range invalido",
        }),
      };
    }

    const inicio = Number(match[1]);
    const fimInformado = match[2] ? Number(match[2]) : null;

    const tamanhoTotal = size;
    const TAMANHO_BLOCO = 1024 * 1024;

    if (
      !Number.isSafeInteger(tamanhoTotal) ||
      tamanhoTotal <= 0 ||
      !Number.isSafeInteger(inicio) ||
      inicio < 0 ||
      inicio >= tamanhoTotal ||
      (fimInformado !== null &&
        (!Number.isSafeInteger(fimInformado) || fimInformado < inicio))
    ) {
      return {
        statusCode: 416,
        headers: {
          "Content-Type": "application/json",
          "Content-Range": `bytes */${tamanhoTotal}`,
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Range fora dos limites do arquivo",
        }),
      };
    }

    const fimSolicitado = fimInformado ?? tamanhoTotal - 1;

    const fim = Math.min(
      fimSolicitado,
      inicio + TAMANHO_BLOCO - 1,
      tamanhoTotal - 1,
    );

    const resultado = await streamService(uri, inicio, fim, tamanhoTotal);

    if (!resultado) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Não foi possível ler o arquivo",
        }),
      };
    }

    return {
      statusCode: 206,
      headers: {
        "Content-Type": mimeType || "application/octet-stream",
        "Content-Length": String(resultado.conteudo.byteLength),
        "Content-Range": `bytes ${resultado.inicio}-${resultado.fim}/${resultado.tamanhoTotal}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
      },
      body: resultado.conteudo,
    };
  } catch (error) {
    console.error("Erro ao transmitir arquivo:");
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: false,
        mensagem: "Erro ao procurar arquivo",
      }),
    };
  }
}
