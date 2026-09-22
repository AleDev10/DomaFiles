import { HttpServer, ConfigServer } from "react-native-nitro-http-server";
import { getLocalIp } from "react-native-local-network-info";

import { requisição } from "./controller/iniciarServidorController";
import { socket } from "./controller/socketController";

const server = new ConfigServer();

export async function iniciarServidor() {
  try {
    server.onWebSocket("/ws", socket);

    const port = await server.start(
      3000,
      requisição,
      {
        mounts: [
          {
            type: "websocket",
            path: "/ws",
          },
        ],
      },
      { host: "0.0.0.0" },
    );

    console.log(`Servidor iniciado na porta ${port}`);

    return port;
  } catch (error) {
    console.log("Erro ao iniciar o servidor");
  }
}

export async function pararServidor() {
  try {
    await server.stop();
    console.log("Servidor parado");
  } catch (error) {
    console.log("Erro ao parar o servidor");
  }
}

export async function obterIP() {
  try {
    const info = await getLocalIp();
    return info.ip;
  } catch (error) {
    console.log("Erro ao obter IP");
  }
}
