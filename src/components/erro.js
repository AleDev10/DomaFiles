import { StyleSheet, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import LetraInicial from "./letrainicial";
import Fundo from "./fundo";
import FundoInicio from "./fundoInicio";
import FundoHome from "./fundoHome";

export default function Erro({ mensagem, tipo }) {
  switch (tipo) {
    case "tipo1":
      return (
        <FundoInicio>
          <Text style={styles.textoBV}>ERRO</Text>
          <Text style={styles.textoInfo}>{mensagem}</Text>
        </FundoInicio>
      );
    case "tipo2":
      return (
        <Fundo>
          <View style={styles.caixaFormulario2}>
            <Text style={styles.textoBV}>ERRO</Text>
            <Text style={styles.textoInfo}>{mensagem}</Text>
          </View>
        </Fundo>
      );
    case "tipo3":
      return (
        <FundoHome>
          <View style={styles.caixaFormulario2}>
            <Text style={styles.textoBV2}>ERRO</Text>
            <Text style={styles.textoInfo2}>{mensagem}</Text>
          </View>
        </FundoHome>
      );

    default:
      break;
  }
}

const styles = StyleSheet.create({
  caixaFormulario2: {
    backgroundColor: "transparent",
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "100%",
  },
  textoBV: {
    fontFamily: "Montserrat-Black",
    color: "#ffff",
    fontSize: RFPercentage(4),
  },
  textoInfo: {
    color: "#ffff",
    fontFamily: "Montserrat-Light",
    textAlign: "center",
    fontSize: RFPercentage(2),
  },
  textoBV2: {
    fontFamily: "Montserrat-Black",
    color: "#141414",
    fontSize: RFPercentage(4),
  },
  textoInfo2: {
    color: "#141414",
    fontFamily: "Montserrat-Light",
    textAlign: "center",
    fontSize: RFPercentage(2),
  },
});
