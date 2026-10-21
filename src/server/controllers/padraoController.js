export function padraoController(req, res) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      sucesso: true,
      mensagem: "Servidor DOMA FILES funcionando",
    }),
  };
}
