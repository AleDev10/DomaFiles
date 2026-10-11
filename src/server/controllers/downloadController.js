import { downloadService } from "../services/downloadService";

export async function downloadController(req, res) {
  try {
    const path = req.path;
    const url = new URL(path, "http://localhost");
    const uri = url.searchParams.get("uri");
    const nome = url.searchParams.get("nome");
    const size = Number(url.searchParams.get("size"));

    if (!uri || !nome || !size) {
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

    const arquivo = await downloadService(uri,size);

    if (!arquivo) {
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
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename=${nome}`,
        "Content-Length": String(size),
      },
      body: arquivo.bytes.buffer,
    };
  } catch (error) {
    console.error("Erro ao procurar arquivo", error);
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
