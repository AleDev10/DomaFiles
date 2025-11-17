import { StyleSheet, View } from "react-native";

export default function Fundo({children}) {
  return (
    <View style={styles.caixaPrincipal}>
      <View style={styles.caixaSegundaria}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    backgroundColor: "#0f50a6",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingRight: 10,
  },
  caixaSegundaria: {
    backgroundColor: "#63bbf2",
    width: "100%",
    height: "88%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
