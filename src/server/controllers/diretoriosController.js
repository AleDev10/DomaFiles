import { diretoriosService } from "../services/diretoriosService";

export async function diretoriosController(req, res) {
  try {
    const diretoriosArry = await diretoriosService();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        dados: {
          diretorios:diretoriosArry,
        },
        mensagem: "Diretorios obtidos",
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
        mensagem: "Erro ao buscar diretorios",
      }),
    };
  }
}
