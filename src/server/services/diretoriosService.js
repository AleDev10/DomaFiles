import { obterDiretorios } from "../configs/storegeConfig";

export async function diretoriosService() {
  try {
    const diretoriosObjeto = obterDiretorios();

    if (!diretoriosObjeto) {
      return null;
    }

    const diretoriosArry = [];

    diretoriosObjeto.forEach((diretorio) => {
      diretoriosArry.push({
        id:diretorio.id,
        nome:diretorio.nome
      });
    });

    return diretoriosArry;
  } catch (error) {
    console.error("Erro ao tratar diretorios", error);
  }
}
