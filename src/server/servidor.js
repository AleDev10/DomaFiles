import { ConfigServer } from "react-native-nitro-http-server";
import { getLocalIp } from "react-native-local-network-info";

import { webSocket } from "./webSocket";
import { rotas } from "./router/rotasRouter";
import { casheConfig } from "./configs/casheConfig";
import { resetarIDs } from "./services/diretorioService";
import { deletarDiretorios } from "./configs/storegeConfig";

const server = new ConfigServer();

export async function iniciarServidor() {
  try {
    server.onWebSocket("/ws", webSocket);

    const port = await server.start(
      3000,
      rotas,
      {
        request_timeout_secs: 1800,
        mounts: [
          {
            type: "websocket",
            path: "/ws",
          },
        ],
        cors: {
          origin: "*"
        },
      },
      { host: "0.0.0.0" },
    );

    return port;
  } catch (error) {
    console.log("Erro ao iniciar o servidor");
  }
}

export async function pararServidor() {
  try {
    //resetarIDs();
    //deletarDiretorios();
    //casheConfig();
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
