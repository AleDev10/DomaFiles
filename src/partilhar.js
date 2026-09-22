import { StyleSheet, View, Text, ScrollView } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect, useState, useRef } from "react";
import QrCode from "react-native-qrcode-svg";

//COMPONENTES
import BtnUniversal from "./components/btnuniversal";
import Dispositivos from "./components/dispositivos";
import Fundo from "./components/fundo";

//SERVIÇOS
import { iniciarServidor, obterIP, pararServidor } from "./server/servidor";

export default function Partilhar2() {
  const [qrCode, setQrCode] = useState(false);
  const [porta, setPorta] = useState(null);
  const [ip, setIp] = useState("");
  const [clientes, setClientes] = useState([]);

  const wsRef = useRef(null);

  useEffect(() => {
    let montado = true;

    (async () => {
      const port = await iniciarServidor();
      const ipRede = await obterIP();

      if (!montado) return;
      setPorta(port);
      setIp(ipRede);
    })();

    return () => {
      montado = false;
      wsRef.current?.close();
      wsRef.current = null;
      pararServidor();
    };
  }, []);

  useEffect(() => {
    if (!ip || !porta) return;

    const url = `ws://${ip}:${porta}/ws`;
    console.log("Conectando WS em:", url);

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      console.log("Respostas do servidor:", event.data);
      setClientes(() => [event.data]);
    };

    return () => {
      ws.close();
    };
  }, [ip, porta]);

  const carregar = Boolean(ip && porta);

  if (!carregar) {
    return (
      <Fundo>
        <View style={styles.caixaSecundaria}>
          <Text>Carregando...</Text>
        </View>
      </Fundo>
    );
  }

  if (qrCode) {
    return (
      <Fundo>
        <View style={styles.caixaSecundaria}>
          <View style={styles.caixaTexto}>
            <Text style={styles.titulo}>QRCODE</Text>
            <Text style={styles.frase}>SCANEIE PARA SE CONECTAR</Text>
          </View>
          <View style={styles.caixaQrcode}>
            <QrCode value={`http://${ip}:${porta}`} size={300} />
            <Text style={styles.textoOpcao}>OU DIGITE</Text>
            <View style={styles.caixaUrl}>
              <Text style={styles.textoUrl}>
                http://{ip}:{porta}
              </Text>
            </View>
          </View>
          <View style={styles.caixaBtnBranco}>
            <BtnUniversal
              icone={"detalhes"}
              evento={() => {
                setQrCode(false);
              }}
            ></BtnUniversal>
          </View>
        </View>
      </Fundo>
    );
  }

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
          <BtnUniversal
            icone={"qrcode"}
            evento={() => {
              setQrCode(true);
            }}
          ></BtnUniversal>
        </View>
      </View>
      <View style={styles.caixaInferior}>
        <Text style={styles.textoDispositivos}>DISPOSITIVOS CONECTADOS</Text>
        <ScrollView style={styles.caixaDispositivos}>
          {clientes.map((id, index) => (
            <View style={styles.conectados} key={index}>
              <Dispositivos inicial={"A"} nome={id}></Dispositivos>
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
  caixaSecundaria: {
    width: "100%",
    height: "100%",
    padding: 10,
    gap: 10,
  },
  caixaTexto: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.5),
    color: "#fff",
  },
  frase: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
    color: "#fff",
  },
  caixaQrcode: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    gap: 10,
    height: "65%",
  },
  qrcode: {
    width: 300,
    height: 300,
  },
  textoOpcao: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
  },
  caixaUrl: {
    backgroundColor: "#0f50a6",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
  },
  textoUrl: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFValue(15),
    color: "#fff",
  },
});
