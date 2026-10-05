export function erroController(req, res) {
  return {
    statusCode: 404,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sucesso: false,
      mensagem: "Rota Não encontrada",
    }),
  };
}
