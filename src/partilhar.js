import { StyleSheet, View, Text, ScrollView } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect, useState } from "react";
import QrCode from "react-native-qrcode-svg";

//COMPONENTES
import BtnUniversal from "./components/btnuniversal";
import Dispositivos from "./components/dispositivos";
import Fundo from "./components/fundo";

//SERVIÇOS
import { iniciarServidor, obterIP, pararServidor } from "./server/servidor";

export default function Partilhar2() {

  const [qrCode, setQrCode] = useState(false);
  const [porta, setPorta] = useState(0);
  const [ip, setIp] = useState("");
  const [carregar, setCarregar] = useState(false);

  const obterInfoRede = async () => {
    const port = await iniciarServidor();
    setPorta(port);

    const ipRede = await obterIP();
    setIp(ipRede);
  };

  const pararCarregamento = () => {
    setTimeout(() => {
      setCarregar(true);
    }, 1000);
  };

  useEffect(() => {
    obterInfoRede();
    pararCarregamento();

    return () => {
      pararServidor();
    };
  }, []);

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
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
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
