const arquivosPorId = new Map();

export function registrarArquivo(arquivo) {
  arquivosPorId.set(arquivo.id, arquivo);
  return arquivo
}

export function obterArquivoPorId(id) {
  return arquivosPorId.get(id);
}
