import { StyleSheet, View, Text, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useEffect, useState} from "react";

//COMPONENTES
import BtnUniversal from "./components/btnuniversal";
import Dispositivos from "./components/dispositivos";
import Fundo from "./components/fundo";
import QrCodeView from "./components/qrCodeView";
import Erro from "./components/erro";
import Carregar from "./components/carregar";

//SERVIÇOS
import { iniciarServidor, obterIP, pararServidor } from "./server/servidor";
import { deletarClientes } from "./server/controller/socketController";

export default function Partilhar() {
  const [qrCode, setQrCode] = useState(false);
  const [porta, setPorta] = useState(null);
  const [ip, setIp] = useState("");
  const [clientes, setClientes] = useState([]);

  const [estado, setEstado] = useState("carregando");
  const [mensagemErro, setMensagemErro] = useState("");

  function tratarMensagem(mensagem) {
    let dados;
    try {
      dados = JSON.parse(mensagem);
    } catch (erro) {
      console.error("Erro ao tratar mensagem");
      return;
    }

    if (dados.info === "adicionar-cliente") {
      setClientes((atuais) => [...atuais, dados.menssagem.user]);
    }

    if (dados.info === "listar-clientes") {
      setClientes(dados.menssagem.users);
    }
  }

  useEffect(() => {
    let montado = true;

    async function iniciar() {
      try {
        const port = await iniciarServidor();
        const ipRede = await obterIP();

        if (!montado) return;

        if (!port || !ipRede) {
          setEstado("carregando");
          return;
        }

        setPorta(port);
        setIp(ipRede);
        setEstado("pronto");
      } catch (erro) {
        console.error("Erro ao iniciar servidor");
        if (!montado) return;
        setMensagemErro("Erro ao iniciar o servidor");
        setEstado("erro");
      }
    }

    iniciar();

    return () => {
      montado = false;
      deletarClientes();
      pararServidor();
    };
  }, []);

  useEffect(() => {
    if (!ip || !porta) return;

    const url = `ws://${ip}:${porta}/ws`;
    console.log("Endereço:", url);

    let ws;

    try {
      ws = new WebSocket(url);
    } catch (erro) {
      console.error("Erro ao abrir WebSocket");
      setMensagemErro("Erro ao abrir WebSocket");
      setEstado("erro");
      return;
    }

    ws.onopen = () => {
      console.log("WebSocket conectado");
      setClientes((atuais) => [...atuais, "Servidor"]);
    };

    ws.onclose = (evento) => {
      console.log("WebSocket fechado");
    };

    ws.onmessage = (event) => {
      tratarMensagem(event.data);
    };

    ws.onerror = (erro) => {
      console.error("ERRO WEBSOCKET", erro);
      setMensagemErro(`Erro WebSocket ${JSON.stringify(erro,null,2)}`);
      setEstado("erro");
    };

    return () => {
      ws.close();
    };
  }, [ip, porta]);

  if (estado === "carregando") return <Carregar tipo="fundo"></Carregar>;
  if (estado === "erro") return <Erro mensagem={mensagemErro} tipo="tipo2" />;

  if (qrCode)
    return (
      <QrCodeView ip={ip} porta={porta} aoVoltar={() => setQrCode(false)} />
    );

  return (
    <Fundo style={styles.caixaPrincipal}>
      <View style={styles.caixaSuperior}>
        <View style={styles.caixaTextos}>
          <Text style={styles.titulo}>PARTILHAR</Text>
          <View style={styles.caixaParagrafos}>
            <Text style={styles.paragrafo}>
              liGUE OS OUTROS{"\n"}DISPOSITIVOS AO{"\n"}PONTO DE ACESSO{"\n"}
              DO SEU E SCANEIE{"\n"}O QRCODE
            </Text>
            <Text style={styles.paragrafo}>
              SE CERTIFIQUE QUE{"\n"}O PONTO DE ACESSO{"\n"}ESTÁ ATIVADO E QUE
              {"\n"}CADA DESPOSITIVO{"\n"}ESTÁ CONECTADO AO MESMO
            </Text>
            <Text style={styles.paragrafo}>
              OU DIGITE ESTE ENDEREÇO:{"\n"}http://{ip}:{porta}
            </Text>
          </View>
        </View>
        <View>
          <BtnUniversal icone={"qrcode"} evento={() => setQrCode(true)} />
        </View>
      </View>

      <View style={styles.caixaInferior}>
        <Text style={styles.textoDispositivos}>DISPOSITIVOS CONECTADOS</Text>
        <ScrollView style={styles.caixaDispositivos}>
          {clientes.map((id, index) => (
            <View style={styles.conectados} key={index}>
              <Dispositivos inicial={"A"} nome={id} />
            </View>
          ))}
        </ScrollView>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaSuperior: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    height: "40%",
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.5),
    color: "#fff",
  },
  caixaParagrafos: {
    gap: 20,
  },
  paragrafo: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
    color: "#fff",
  },
  caixaInferior: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    gap: 10,
  },
  textoDispositivos: {
    fontFamily: "Montserrat-Bold",
    fontSize: RFPercentage(2),
    color: "#fff",
  },
  caixaDispositivos: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  conectados: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
});
