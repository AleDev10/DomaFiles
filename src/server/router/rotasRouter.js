import { arquivoControler } from "../controllers/arquivoControler";
import { arquivosController } from "../controllers/arquivosController";
import { erroController } from "../controllers/erroController";
import { padraoController } from "../controllers/padraoController";

export const rotas = async (req,res) => {
  try {
    
    if (req.method ==="GET" && req.path ==="/") {
      return padraoController(req,res);
    }

    if (req.method === "GET" && req.path ==="/arquivos") {
      return arquivosController(req,res);
    }
    
    if (req.method === "GET" && req.path.startsWith("/arquivos/")) {
      return arquivoControler(req,res);
    }

    return erroController(req,res);
    
  } catch (error) {
    console.log("Erro nas rotas");
  }
};