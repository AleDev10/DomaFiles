import { diretorioService } from "../services/diretorioService";

export async function diretorioController(req, res) {
  try {
    const nomeDiretorio = JSON.parse(req.body);

    if (!nomeDiretorio) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Não foi indicada um nome de diretorio",
        }),
      };
    }

    const diretorio = await diretorioService(nomeDiretorio.nome);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        dados: {
          diretorio,
        },
        mensagem: "Diretorio criado com sucesso",
      }),
    };
  } catch (error) {
    console.error("Erro ao criar diretorio", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: false,
        mensagem: "Erro ao criar diretorio",
      }),
    };
  }
}
