import { arquivosService } from "../services/arquivosService";

let pastaSelecionada = null;

export function definirPasta(uri) {
  pastaSelecionada = uri;
  console.log(pastaSelecionada);
}

export async function arquivosController(req, res) {
  try {
    if (!pastaSelecionada) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucesso: false,
          mensagem: "Não foi indicada um diretirio",
        }),
      };
    }

    const arquivo = await arquivosService(pastaSelecionada);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        mensagem: arquivo,
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
        mensagem: "Erro nas respostas dos arquivos",
      }),
    };
  }
}
