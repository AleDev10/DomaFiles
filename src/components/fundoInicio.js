import { StyleSheet, View } from "react-native";

import LetraInicial from "./letrainicial";

export default function fundoInicio({ children }) {
  return (
    <View style={styles.caixaPrincipal}>
      <View style={styles.caixaConteudo}>
        <LetraInicial letra={"E"}></LetraInicial>
        <View style={styles.caixaFormulario}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    width: "100%",
  },
  caixaConteudo: {
    flex: 1,
    backgroundColor: "#63bbf2",
    alignItems: "center",
    gap: 30,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    marginTop: 30,
  },
  caixaFormulario: {
    backgroundColor: "#0f50a6",
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "100%",
  },
});
