import { downloadService } from "../services/downloadService";

export async function downloadController(req, res) {
  try {
    const uri = req.path.slice("/arquivos/".length,req.path.length - "/download".length);
    
    if (!uri) {
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

    const download = await downloadService(uri);
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        dados: "",
        mensagem: "Download feito",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: false,
        mensagem: "Erro na resposta do download"
      }),
    };
  }
}
