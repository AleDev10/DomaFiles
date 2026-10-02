import { diretorioClient } from "../clients/diretorioClient";
import { registrarDiretorio } from "../configs/storegeConfig";

let itemID = 1;

export async function diretorioService(nome) {
  try {
    const arquivos = await diretorioClient();

    if (!arquivos) {
      return null;
    }

    return registrarDiretorio({
      id: `diretorio-${itemID++}`,
      nome,
      arquivos,
    });
  } catch (error) {
    console.error("Erro ao tratar arquivos", error);
  }
}
