import { diretorioIDService } from "../services/diretorioIDService";
import { diretorioService } from "../services/diretorioService";

export async function diretorioIDController(req, res) {
  try {
    const id = req.path.split("/:")[1];

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Não foi indicada um diretorio",
        }),
      };
    }

    const diretorio = await diretorioIDService(id);

    if (!diretorio) {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Diretorio não encontrado",
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
          diretorio,
        },
        mensagem: "Diretorio encontrado com sucesso",
      }),
    };
  } catch (error) {
    console.error("Erro ao procurar diretorio", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: false,
        mensagem: "Erro ao procurar diretorio",
      }),
    };
  }
}
