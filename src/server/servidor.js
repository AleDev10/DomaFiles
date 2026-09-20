import { HttpServer } from "react-native-nitro-http-server";
import { requisição } from "./controller/iniciarServidorController";

const server = new HttpServer();

export async function iniciarServidor() {
  try {
    const port = await server.start(5000, requisição,{host:'0.0.0.0'});

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
