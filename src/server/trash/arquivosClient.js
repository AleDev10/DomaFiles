import * as FileSystem from "expo-file-system/legacy";

export async function lerDiretorio(uri) {
  const infoDiretorio = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);
  return infoDiretorio;
}

export async function lerArquivo(uri) {
  const infoArquivo = await FileSystem.getInfoAsync(uri);
  return infoArquivo;
}

export async function arquivosClient(uri) {
  try {
    const resultado = lerDiretorio(uri);
    return resultado;
  } catch (error) {
    console.error("Erro ao acessar arquivos");
  }
}
