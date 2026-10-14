const diretorioStorege = new Map();

export function registrarDiretorio(diretorio = {id,nome,arquivos}) {
  diretorioStorege.set(diretorio.id, diretorio);
  return diretorio
}

export function obterDiretorioPorId(id) {
  return diretorioStorege.get(id);
}

export function obterDiretorios() {
  return diretorioStorege;
}

export function deletarDiretorios() {
  diretorioStorege.clear();
}