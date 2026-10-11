import { File } from "expo-file-system";

export async function downloadClient(uri) {
  try {
    const arquivo = new File(uri);

    if (!arquivo) {
      console.error("File está null");
      return null;
    }
    return arquivo;
  } catch (error) {
    console.error("Erro ao criar File cashe");
  }
}
