import { downloadService } from "./downloadService";

export async function downloadController(req, res) {
  try {
    const id = req.path.slice(
      "/arquivos/".length,
      req.path.length - "/download".length,
    );
    
    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Não foi indicada um arquivo",
        }),
      };
    }

    const download = await downloadService(id);

    if (!download) {
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
      statusCode: 200,
      headers: {
        "Content-Type": download.contentType,
        "Content-Length": String(download.tamanho),
        "Content-Disposition": `attachment; filename="${download.nome}"`,
        "Transfer-Encoding": "chunked"
      },
      body: download.conteudo,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: false,
        mensagem: "Erro na resposta do download",
      }),
    };
  }
}
