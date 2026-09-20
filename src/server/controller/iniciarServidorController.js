export const requisição = async (request) => {
  try {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sucesso: true,
        mensagem: "Servidor DOMA FILES funcionando!",
        metodo: request.method,
      }),
    };
  } catch (error) {
    console.log("Erro ao criar response do servidor");
  }
};