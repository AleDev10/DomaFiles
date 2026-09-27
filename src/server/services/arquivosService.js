import { arquivosClient } from "../clients/arquivosClient";

export async function arquivosService(uri) {
  try {
    const resultado = await arquivosClient();
    
    return resultado;
  } catch (error) {
    console.log("Erro ao tratar URI");
  }
}