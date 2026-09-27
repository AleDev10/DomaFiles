export function padraoController(req, res) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sucesso: true,
      mensagem: "Servidor DOMA FILES funcionando",
    }),
  };
}
