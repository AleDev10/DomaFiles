import * as FileSystem from "expo-file-system/legacy";

export async function arquivosClient(uri) {
  try {
    const resultado =
      await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);

    const conteudos = await Promise.all(
      resultado.map(async (uri) => {
        const uriDECODE = decodeURIComponent(uri);
        const nome = uriDECODE.substring(uriDECODE.lastIndexOf("/") + 1);

        let Diretorio = false;

        try {
          await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);

          Diretorio = true;
        } catch {
          Diretorio = false;
        }

        if (Diretorio) {
          return {
          nome,
          Diretorio: true,
          tamanho: 0,
          extensao: null,
          uri
        };
        }

        const info = await FileSystem.getInfoAsync(uri);
        const extensao =
          nome.includes(".") && !info.isDirectory
            ? nome.split(".").pop().toLowerCase()
            : null;

        return {
          nome,
          Diretorio: info.isDirectory,
          tamanho: info.size ?? 0,
          extensao,
          uri
        };
      }),
    );

    return conteudos
  } catch (error) {
    console.error("Erro listar Arquivos", error);
    throw Error("Erro listar Arquivos");
  }
}
