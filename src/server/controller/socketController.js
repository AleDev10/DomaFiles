export const socket = (ws, request) => {
  ws.onmessage = (event) => {
    console.log("Mensagem recebida:", event.data);

    ws.send(`Servidor recebeu: ${event.data}`);
  };

  ws.onclose = (event) => {
    console.log("Cliente desconectado:", event.code, event.reason);
  };
};
