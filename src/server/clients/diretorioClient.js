import * as FileSystem from "expo-file-system/legacy";

export async function diretorioClient() {
  try {
    const resultado = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    
    return resultado;
  } catch (error) {
    console.log("Erro ao escolher diretorio");
  }
}
