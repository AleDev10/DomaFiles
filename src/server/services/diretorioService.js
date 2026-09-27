import { diretorioClient } from "../clients/diretorioClient";
import { definirPasta } from "../controllers/arquivosController";

export async function diretorioService() {
  try {
    const resultado = await diretorioClient();

    if (!resultado.granted) {
      return null;
    }

    const pastaURI = resultado.directoryUri;

    definirPasta(pastaURI);
    
    return pastaURI;
  } catch (error) {
    console.log("Erro ao tratar URI");
  }
}
