import { arquivoURIClient } from "../clients/arquivoURIClient";

export async function arquivoURIService(uri) {
  try {
    const arquivoBytes = await arquivoURIClient(uri);
    
    if (!arquivoBytes) {
      return null;
    }

    return arquivoBytes;
  } catch (error) {
    console.error("Erro ao tratar arquivo", error);
  }
}
