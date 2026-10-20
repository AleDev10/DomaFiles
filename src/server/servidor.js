import { createConfigServer } from "react-native-nitro-http-server";
import { getLocalIp } from "react-native-local-network-info";

import { webSocket } from "./webSocket";
import { rotas } from "./router/rotasRouter";
import { casheConfig } from "./configs/casheConfig";
import { resetarIDs } from "./services/diretorioService";
import { deletarDiretorios } from "./configs/storegeConfig";

const port = 3000;
const config = {
  request_timeout_secs: 1800,
  mounts: [
    {
      type: "websocket",
      path: "/ws",
    },
    {
      type: 'diretorios',
      path: '/diretorios',
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
  ],
  cors: "*",
};
const hostOrOptions = { host: "0.0.0.0",autoRestart: true };
let server;

export async function iniciarServidor() {
  try {
    const serverConfig = createConfigServer(port,rotas,config,hostOrOptions);

    server = await serverConfig;

    console.log(server);

    server.onWebSocket("/ws",webSocket);

    return server.port;
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
