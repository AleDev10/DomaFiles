import { arquivoURIService } from "../services/arquivoURIService";

export async function arquivoURIController(req, res) {
  try {
    const uri = req.path.slice(
      "/arquivo/:".length,
      req.path.length - "/download".length,
    );

    if (!uri) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Não foi indicado um arquivo",
        }),
      };
    }

    const arquivo = await arquivoURIService(uri);

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        dados: {
          arquivo,
        },
        mensagem: "Arquivo encontrado com sucesso",
      }),
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
