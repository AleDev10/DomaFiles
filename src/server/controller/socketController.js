let proximoId = 1;

const clientes = new Map();

function listarCliente() {
  clientes.forEach((ws) => {
    ws.send(Array.from(clientes.keys()));  
  });
}

export const socket = (ws, request) => {
  const id = `cliente-${proximoId++}`;

  clientes.set(id, ws);

  listarCliente();

  console.log("Cliente conectado:", id);

  ws.onmessage = (event) => {
    console.log("Mensagem recebida:", event.data);

    ws.send("servisor respondeu"+event.data);
  };

  ws.onclose = (event) => {
    console.log("Cliente desconectado:");

    clientes.forEach((ws, index) => {
      console.log(ws._connectionId);
      console.log(index);
    });
  };
};
