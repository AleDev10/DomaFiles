import { StyleSheet, View, Text } from "react-native";

//componentes
import LetraInicial from "./letrainicial";

export default function Dispositivos({ inicial,nome }) {
  return (
    <View style={styles.dispositivos}>
      <LetraInicial letra={inicial} tipo={"pequena"}></LetraInicial>
      <Text style={styles.textoDispositivo}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dispositivos: {
    backgroundColor: "#0f50a6",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderRadius: 20,
    gap: 10,
  },
  textoDispositivo: {
    fontFamily: "Montserrat-Black",
    fontSize: 15,
    color: "#fff",
  },
});
