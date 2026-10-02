import { downloadClient } from "./downloadClient";
import { obterArquivoPorId } from "../configs/storegeConfig";

export async function downloadService(id) {
  try {
    
    const arquivo = obterArquivoPorId(id);

    if (!arquivo) {
      return null;
    }

    if (arquivo.ehDiretorio) {
      return null;
    }
    
    const uriDeco = decodeURIComponent(arquivo.uri);

    const conteudo = await downloadClient(uriDeco);

    if (!conteudo) {
      return null;
    }

    return {
      nome: arquivo.nome,
      tamanho: arquivo.tamanho,
      contentType: arquivo.contentType,
      conteudo,
    };
  } catch (error) {
    console.error("Erro ao tratar download");
  }
}
