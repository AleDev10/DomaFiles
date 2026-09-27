import * as FileSystem from "expo-file-system/legacy";

export async function SelecionarDiretorioCrontroller() {
  try {
    const resultado = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!resultado.granted) {
      return null;
    }

    const pastaURI = resultado.directoryUri;

    console.log(pastaURI)
    
    return pastaURI;
  } catch (error) {
    console.log("Erro seleção de diretorio");
  }
}
