import { View, Text, StyleSheet } from "react-native";
import QrCode from "react-native-qrcode-svg";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import BtnUniversal from "./btnuniversal";
import Fundo from "./fundo";

export default function QrCodeView({ ip, porta, aoVoltar }) {
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
          <BtnUniversal icone={"detalhes"} evento={aoVoltar} />
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
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
