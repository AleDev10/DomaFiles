import { File } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export async function EscolherArquivosConfig() {
  try {
    const arquivos = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (!arquivos.canceled) {
        console.log(arquivos.assets);
    }

    console.log(arquivos.assets);
  } catch (error) {
    console.error("Erro ao acessar arquivos", error);
  }
}
