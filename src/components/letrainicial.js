import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function LetraInicial({ letra, tipo }) {
  switch (tipo) {
    case "pequena":
      return (
        <View style={styles.caixaFotoPequena}>
          <Text style={styles.letraPequena}>{letra}</Text>
        </View>
      );
      break;

    default:
      return (
        <View style={styles.caixaFoto}>
          <Text style={styles.letra}>{letra}</Text>
        </View>
      );
      break;
  }
}

const styles = StyleSheet.create({
  caixaFoto: {
    backgroundColor: "#ffff",
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  letra: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(15),
    marginBottom:15
  },
  caixaFotoPequena: {
    backgroundColor: "#ffff",
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  letraPequena:{
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(4),
    marginBottom:7
  }
});
