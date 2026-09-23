let proximoId = 1;

const clientes = new Map();

function adicionarCliente(id) {
  clientes.forEach((ws) => {
    ws.send(
      JSON.stringify({
        info: "adicionar-cliente",
        menssagem: {
          user: id,
        },
      }),
    );
  });
}

function listarCliente() {
  clientes.forEach((ws) => {
    ws.send(
      JSON.stringify({
        info: "listar-clientes",
        menssagem: {
          users: Array.from(clientes.keys()),
        },
      }),
    );
  });
}

export function deletarClientes() {
  ((proximoId = 1), clientes.clear());
}

export const socket = (ws, request) => {
  const id = `cliente-${proximoId++}`;

  clientes.set(id, ws);

  adicionarCliente(id);

  ws.onmessage = (event) => {
    console.log("Mensagem recebida:", event.data);
  };

  ws.onclose = () => {
    console.log("Cliente desconectado:", id);

    clientes.delete(id);

    listarCliente();
  };
};
