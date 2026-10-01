import { arquivoControler } from "../controllers/arquivoControler";
import { arquivosController } from "../controllers/arquivosController";
import { downloadController } from "../controllers/downloadController";
import { erroController } from "../controllers/erroController";
import { padraoController } from "../controllers/padraoController";

export const rotas = async (req,res) => {
  try {
    
    if (req.method ==="GET" && req.path ==="/") {
      return padraoController(req,res);
    }

    /* if (req.method === "GET" && req.path ==="/arquivos") {
      return arquivosController(req,res);
    }

    if (req.method === "GET" && req.path.startsWith("/arquivos/") && req.path.endsWith("/download")) {
      return downloadController(req,res);
    }
    
    if (req.method === "GET" && req.path.startsWith("/arquivos/")) {
      return arquivoControler(req,res);
    } */

    return erroController(req,res);
    
  } catch (error) {
    console.error("Erro nas rotas",error);
  }
};