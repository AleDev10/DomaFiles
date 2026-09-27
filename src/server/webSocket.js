let proximoId = 1;

const clientes = new Map();

function enviarParaTodos(mensagem) {
  const dados = JSON.stringify(mensagem);
  clientes.forEach((ws, id) => {
    try {
      ws.send(dados);
    } catch (erro) {
      console.error(`Erro ao enviar para ${id}`);
      clientes.delete(id);
    }
  });
}

function adicionarCliente(id) {
  enviarParaTodos({
    info: "adicionar-cliente",
    menssagem: { user: id },
  });
}

function listarCliente() {
  enviarParaTodos({
    info: "listar-clientes",
    menssagem: { users: Array.from(clientes.keys()) },
  });
}

export function deletarClientes() {
  proximoId = 1;
  clientes.clear();
}

export const webSocket = (ws, request) => {
  const id = `cliente-${proximoId++}`;

  clientes.set(id, ws);

  ws.onmessage = (event) => {
    console.log("Mensagem recebida:", event.data);
  };

  ws.onclose = () => {
    console.log("Cliente desconectado:", id);
    clientes.delete(id);
    listarCliente();
  };

  ws.onerror = (erro) => {
    console.error(`Erro no cliente ${id}`);
    clientes.delete(id);
  };

  adicionarCliente(id);
};
