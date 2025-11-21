import { StyleSheet, Text} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Titulo({ posicao }) {
  switch (posicao) {
    case "centro":
      return <Text style={styles.titulo}>DOMA</Text>;
      break;
    case "esquerda":
      return <Text style={styles.tituloEsquerda}>DOMA</Text>;
      break;

    default:
      return <Text style={styles.titulo}>DOMA</Text>;
      break;
  }
}
const styles = StyleSheet.create({
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(7),
    marginTop: 10,
  },
  tituloEsquerda: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(5),
    color:'#fff',

  },
});
