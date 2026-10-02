import { arquivosService } from "./arquivosService";

export async function arquivoControler(req, res) {
  try {
    const uri = req.path.split("/arquivos/")[1];

    if (!uri) {
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

    const arquivos = await arquivosService(uri);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        dados: arquivos,
        mensagem: "Itens do diretorio",
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
