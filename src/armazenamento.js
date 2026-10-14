import { StyleSheet, View, Text, Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState, useEffect } from "react";

//componentes
import Fundo from "./components/fundo";
import BtnUniversal from "./components/btnuniversal";
import Erro from "./components/erro";

export default function Armazenamento({ route }) {
  const { url } = route.params;

  const [estado, setEstado] = useState("pronto");
  const [mensagemErro, setMensagemErro] = useState("");
  const [diretorios, setdiretorios] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [estadonavegacao, setEstadonavegacao] = useState(false);

  async function buscarDiretorios() {
    try {
      const diretorios = await fetch(`${url}/diretorios`, {
        method: "GET",
      });

      if (!diretorios.ok) {
        console.error("Falha ao buscar diretorios");
      }

      const diretoriosDados = await diretorios.json();
      setdiretorios(diretoriosDados.dados.diretorios);
    } catch (error) {
      console.error("Erro ao buscar diretorios");
      setMensagemErro("Erro ao buscar diretorios");
      setEstado("erro");
      return;
    }
  }

  function abrirDiretorio(id, sentido) {
    if (!id && sentido === "voltar") {
      setEstadonavegacao(false);
    } else if (sentido === "avançar") {
      setEstadonavegacao(true);
    }
  }

  async function buscarDiretorio(id) {
    try {
      const diretorio = await fetch(`${url}/diretorio/:${id}`, {
        method: "GET",
      });

      if (!diretorio.ok) {
        console.error("Falha ao buscar diretorio");
      }

      const diretorioDados = await diretorio.json();
      console.log(diretorioDados.dados.diretorio.arquivos);
      setArquivos(diretorioDados.dados.diretorio.arquivos);

      abrirDiretorio(id, "avançar");
      
    } catch (error) {
      console.error("Erro ao buscar arquivo");
      setMensagemErro("Erro ao buscar arquivo");
      setEstado("erro");
      return;
    }
    
  }

  function conetarWebsocket() {
    const urlWs = `ws://${url.split("http://")[1]}/ws`;
    let ws;

    try {
      ws = new WebSocket(urlWs);
    } catch (erro) {
      console.error("Erro ao abrir WebSocket");
      setMensagemErro("Erro ao abrir WebSocket");
      setEstado("erro");
      return;
    }

    ws.onopen = () => {
      console.log("WebSocket conectado");
      buscarDiretorios();
    };
  }

  useEffect(() => {
    conetarWebsocket();
    setdiretorios([
      {
        id: "diretorio-1",
        nome: "sem diretorios",
      }
    ]);
  }, []);

  if (estado === "erro") return <Erro mensagem={mensagemErro} tipo="tipo2" />;

  if (estadonavegacao) {
    return (
      <Fundo>
        <View style={styles.caixaPrincipal}>
          <Text style={styles.titulo}>ARMAZENAMENTO</Text>
          <Text style={styles.texto}>ACESSO LIMITADO PARA LEITURA</Text>
          <View style={styles.caixaArquivos}>
            <BtnUniversal
              icone={"diretorio"}
              key={"voltar"}
              evento={() => {
                abrirDiretorio(null, "voltar");
              }}
            >
              <Text>voltar...</Text>
            </BtnUniversal>
            {arquivos.map((elemento, index) => (
              <BtnUniversal icone={"arquivo"} key={index} evento={()=>{
                Alert.alert("DOWNLOAD OU STREAM","Escolha uma das opções.");
              }}>
                <Text>{elemento.name}</Text>
              </BtnUniversal>
            ))}
          </View>
        </View>
      </Fundo>
    );
  }

  return (
    <Fundo>
      <View style={styles.caixaPrincipal}>
        <Text style={styles.titulo}>ARMAZENAMENTO</Text>
        <Text style={styles.texto}>ACESSO LIMITADO PARA LEITURA</Text>
        <View style={styles.caixaArquivos}>
          {diretorios.map((elemento, index) => (
            <BtnUniversal
              icone={"diretorio"}
              key={index}
              evento={() => {
                buscarDiretorio(elemento.id);
              }}
            >
              <Text>{elemento.nome}</Text>
            </BtnUniversal>
          ))}
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.5),
    color: "#fff",
  },
  texto: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(2),
    color: "#fff",
  },
  caixaArquivos: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
  },
});
