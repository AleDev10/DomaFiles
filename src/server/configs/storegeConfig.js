const diretorioStorege = new Map();

export function registrarDiretorio(diretorio = {id,nome,arquivos}) {
  diretorioStorege.set(diretorio.id, diretorio);
  console.log("Diretorios registrados:", diretorioStorege.size);
  return diretorio
}

export function obterDiretorioPorId(id) {
  return diretorioStorege.get(id);
}

export function obterDiretorios() {
  return diretorioStorege;
}