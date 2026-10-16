import { StyleSheet, View, Text, Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState, useEffect } from "react";

//componentes
import Fundo from "./components/fundo";
import BtnUniversal from "./components/btnuniversal";
import Erro from "./components/erro";
import { useNavigation } from "@react-navigation/native";

export default function Armazenamento({ route }) {
  const { url } = route.params;
  const navegate = useNavigation();

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
    if (id === "diretorio-teste1") {
      abrirDiretorio(id, "avançar");
      return null;
    }

    try {
      const diretorio = await fetch(`${url}/diretorio/:${id}`, {
        method: "GET",
      });

      if (!diretorio.ok) {
        console.error("Falha ao buscar diretorio");
      }

      const diretorioDados = await diretorio.json();
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

  function opcaoEscolhida(opcao,arquivo ={}) {
    switch (opcao) {
      case "Download":
        console.log("Download: ",arquivo);
        break;
      case "Stream":
        console.log("Stream: ",arquivo);
        navegate.navigate("REPRODUTOR",{dados:arquivo,url:url});
        break;
      case "cancelado":
        console.log("cancelado: ",arquivo);
        break;
    
      default:
        break;
    }
  }

  function abrirAlerta(arquivo) {
    Alert.alert("DOWNLOAD OU STREAM", "Escolha uma das opções", [
      {
        text: "Download",
        onPress: () => {opcaoEscolhida("Download",arquivo)},
        style: "destructive",
      },
      {
        text: "Stream",
        onPress: () => {opcaoEscolhida("Stream",arquivo)},
        style: "destructive",
      },
      {
        text: "Cancelar",
        onPress: () => {opcaoEscolhida("cancelado")},
        style: "cancel",
      },
    ]);
  }

  useEffect(() => {
    conetarWebsocket();
    setdiretorios([
      {
        id: "diretorio-teste1",
        nome: "Animes",
      },
      {
        id: "diretorio-teste1",
        nome: "Series",
      },
      {
        id: "diretorio-teste1",
        nome: "Filmes",
      },
    ]);

    setArquivos([
      {
        lastModified: 1788080086000,
        size: 5280639,
        mimeType: "video/mp4",
        uri: "file:///data/user/0/com.alexandre_junqueiro.DomaFiles.dev/cache/DocumentPicker/47d1ea05-7329-4f51-bfb9-059b0092975c.mp4",
        name: "YouCut_20260830_095427749.mp4",
      },
      {
        lastModified: 1788078610000,
        size: 10502642,
        mimeType: "video/mp4",
        uri: "file:///data/user/0/com.alexandre_junqueiro.DomaFiles.dev/cache/DocumentPicker/c890f814-465e-459d-8868-913f820382be.mp4",
        name: "YouCut_20260830_092946032.mp4",
      },
      {
        lastModified: 1788078306000,
        size: 3122988,
        mimeType: "video/mp4",
        uri: "file:///data/user/0/com.alexandre_junqueiro.DomaFiles.dev/cache/DocumentPicker/51c38496-778b-4797-aef8-b1664317970c.mp4",
        name: "YouCut_20260830_092453089.mp4",
      },
      {
        lastModified: 1788079619000,
        size: 17461745,
        mimeType: "video/mp4",
        uri: "file:///data/user/0/com.alexandre_junqueiro.DomaFiles.dev/cache/DocumentPicker/1f3ec6a3-05bb-433a-8ff3-0dd18369f666.mp4",
        name: "YouCut_20260830_094625098.mp4",
      },
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
              <BtnUniversal
                icone={"arquivo"}
                key={index}
                evento={() => {
                  abrirAlerta({
                    uri:elemento.uri,
                    name:elemento.name,
                    size:elemento.size,
                  });
                }}
              >
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
