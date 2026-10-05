import { obterDiretorioPorId } from "../configs/storegeConfig";

export async function diretorioIDService(id) {
  try {
    const diretorioPorID = await obterDiretorioPorId(id);

    if (!diretorioPorID) {
      return null;
    }

    return diretorioPorID;
  } catch (error) {
    console.error("Erro ao tratar arquivos", error);
  }
}
