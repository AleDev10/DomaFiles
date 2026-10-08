import { diretorioController } from "../controllers/diretorioController";
import { erroController } from "../controllers/erroController";
import { padraoController } from "../controllers/padraoController";
import { diretoriosController } from "../controllers/diretoriosController";
import { diretorioIDController } from "../controllers/diretorioIDController";
import { arquivoURIController } from "../controllers/arquivoURIController";
import { streamController } from "../controllers/streamController";

export const rotas = async (req,res) => {
  try {
    
    if (req.method ==="GET" && req.path ==="/") {
      return padraoController(req,res);
    }

    if (req.method ==="POST" && req.path ==="/diretorio") {
      return diretorioController(req,res);
    }

    if (req.method ==="GET" && req.path ==="/diretorios") {
      return diretoriosController(req,res);
    }

    if (req.method === "GET" && req.path.startsWith("/diretorio/")) {
      return diretorioIDController(req,res);
    } 

    if (req.method === "GET" && req.path.startsWith("/arquivo/") && req.path.endsWith("/download")) {
      return arquivoURIController(req,res);
    }

    if (req.method === "GET" && req.path.startsWith("/stream")) {
      return streamController(req,res);
    } 

    return erroController(req,res);
    
  } catch (error) {
    console.error("Erro nas rotas",error);
  }
};