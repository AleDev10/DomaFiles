import { Directory, File } from "expo-file-system";

export async function downloadClient(uri) {
  try {
    const directory = await Directory.pickDirectoryAsync();

    const itens = directory.list();
    console.log("itens:",itens);
    console.log("downloadClient uri:", uri);

    /* const arquivoEncontrado = itens.find(
      (item) => item instanceof File && item.uri === uri
    );

    if (!arquivoEncontrado) {
      console.log("Arquivo não encontrado no diretório selecionado.");
      return null;
    }

    const bytes = await arquivoEncontrado.bytes();
    console.log(`Bytes lidos com sucesso: ${bytes.length} bytes.`);
    return bytes; */
  } catch (error) {
    console.error("Erro ao baixar arquivo", error);
  }
}
