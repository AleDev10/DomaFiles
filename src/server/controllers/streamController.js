import { streamService } from "../services/streamService";

export async function streamController(req, res) {
  try {
    const path = req.path;
    const url = new URL(path, "http://localhost");
    const uri = url.searchParams.get("uri");
    const nome = url.searchParams.get("nome");
    const size = Number(url.searchParams.get("size"));
    const mimeType = url.searchParams.get("mimeType");
    const range = req.headers.range || "bytes=0-1048575";

    console.log(range);

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

    const fim = fimInformado ?? tamanhoTotal - 1;

    const resultado = await streamService(
      uri,
      inicio,
      fim,
      tamanhoTotal,
    );

    if (!resultado) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Arquivo não encontrado",
        }),
      };
    }

    return {
      statusCode: 206,
      headers: {
        "Content-Type": mimeType || "application/octet-stream",
        "Content-Length": resultado.tamanho,
        "Content-Range": `bytes ${resultado.inicio}-${resultado.fim}/${resultado.tamanhoTotal}`,
        "Accept-Ranges": "bytes",
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
