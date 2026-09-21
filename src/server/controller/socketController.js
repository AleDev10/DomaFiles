let proximoId = 1;

const clientes = new Map();

function listarCliente(id) {
  for (const ws of clientes.values()) {
    ws.send(id);
  }
}

export const socket = (ws, request) => {
  const id = `cliente-${proximoId++}`;

  clientes.set(id, ws);

  listarCliente(id)

  console.log('Cliente conectado:', id);
  console.log('Clientes:', clientes.size);

  ws.onmessage = (event) => {
    console.log("Mensagem recebida:", event.data);

    ws.send(`Servidor recebeu: ${event.data}`);
  };

  ws.onclose = (event) => {
    console.log("Cliente desconectado:", event.code, event.reason);
  };
};
