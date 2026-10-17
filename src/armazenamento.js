import { StyleSheet, View, Text, Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

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
  async function abrirNavegador(info) {
    const { dados, url } = info;
    const requisicao = `${url}/download?uri=${dados.uri}&nome=${dados.name}&size=${dados.size}&mimeType=video/mp4`;

    const resultado = await WebBrowser.openBrowserAsync(requisicao);
    console.log(resultado);
  }

  function opcaoEscolhida(opcao, arquivo = {}) {
    switch (opcao) {
      case "Download":
        abrirNavegador({ dados: arquivo, url: url });
        break;
      case "Stream":
        navegate.navigate("REPRODUTOR", { dados: arquivo, url: url });
        break;
      case "cancelado":
        console.log("cancelado: ", arquivo);
        break;

      default:
        break;
    }
  }

  function abrirAlerta(arquivo) {
    Alert.alert("DOWNLOAD OU STREAM", "Escolha uma das opções", [
      {
        text: "Download",
        onPress: () => {
          opcaoEscolhida("Download", arquivo);
        },
        style: "destructive",
      },
      {
        text: "Stream",
        onPress: () => {
          opcaoEscolhida("Stream", arquivo);
        },
        style: "destructive",
      },
      {
        text: "Cancelar",
        onPress: () => {
          opcaoEscolhida("cancelado");
        },
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
        uri: "file:///data/user/0/com.alexandre_junqueiro.DomaFiles.dev/cache/DocumentPicker/8494333e-1287-4621-851e-e0c41218d397.mp4",
        name: "Solo Leveling EP 2x1.mp4",
      },
      {
        lastModified: 1788080086000,
        size: 228211580,
        mimeType: "video/mp4",
        uri: "file:///data/user/0/com.alexandre_junqueiro.DomaFiles.dev/cache/DocumentPicker/168250d2-2887-43fb-a587-21003db12be5.mp4",
        name: "YouCut_20260830_095427749.mp4",
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
                    uri: elemento.uri,
                    name: elemento.name,
                    size: elemento.size,
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
