import {
  arquivosClient,
  lerArquivo,
  lerDiretorio,
} from "../clients/arquivosClient";
import { registrarArquivo } from "../configs/arquivoConfig";

let itemID = 1;

export async function arquivosService(uri) {
  try {
    const resultado = await arquivosClient(uri);

    const arquivos = await Promise.all(
      resultado.map(async (uri) => {
        const uriDECODE = decodeURIComponent(uri);
        const nome = uriDECODE.substring(uriDECODE.lastIndexOf("/") + 1);

        let Diretorio = false;

        try {
          await lerDiretorio(uri);

          Diretorio = true;
        } catch {
          Diretorio = false;
        }

        if (Diretorio) {
          return registrarArquivo({
            id: `item_${itemID++}`,
            nome,
            Diretorio: true,
            tamanho: 0,
            extensao: null,
            uri,
          });
        }

        const info = await lerArquivo(uri);
        const extensao =
          nome.includes(".") && !info.isDirectory
            ? nome.split(".").pop().toLowerCase()
            : null;

        return registrarArquivo({
          id: `item_${itemID++}`,
          nome,
          Diretorio: info.isDirectory,
          tamanho: info.size ?? 0,
          extensao,
          uri,
        });
      }),
    );

    return arquivos;
  } catch (error) {
    console.log("Erro ao tratar arquivos");
  }
}
