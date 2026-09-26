import { StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function FundoHome({ children }) {
  return (
    <View style={styles.caixaPrincipal}>
      <View style={styles.caixaTexto}>
        <Text style={styles.titulo}>DOMA</Text>
        <Text style={styles.frase}>
          COMPARTILHA COM AS{"\n"}PESSOAS AO TEU REDOR
        </Text>
      </View>
      <View style={styles.caixaBtns}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  caixaTexto: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(6.5),
  },
  frase: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(2.5),
    textAlign: "center",
  },
  caixaBtns: {
    flex: 1,
    backgroundColor: "#63bbf2",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
