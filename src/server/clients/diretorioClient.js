import * as DocumentPicker from 'expo-document-picker';

export async function diretorioClient() {
  try {
    const arquivos = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (arquivos.canceled) {
        return null;
    }

    return arquivos.assets;
  } catch (error) {
    console.error("Erro ao escolher arquivos", error);
  }
}
