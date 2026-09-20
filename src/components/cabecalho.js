import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//componentes
import Titulo from "./titulo";
import ModalOpcao from "./modalopcao";

export default function Cabecalho({ tipo }) {
  const navegation = useNavigation();

  switch (tipo) {
    case "verificado":
      return (
        <View style={styles.caixaPrincipal}>
          <TouchableOpacity
            onPress={() => {
              navegation.goBack();
            }}
          >
            <Image
              source={require("../assets/icons/seta-esquerda.png")}
              style={styles.img}
            ></Image>
          </TouchableOpacity>
          <Titulo posicao={"esquerda"}></Titulo>
          <ModalOpcao></ModalOpcao>
        </View>
      );

    default:
      return (
        <View style={styles.caixaPrincipal}>
          <TouchableOpacity
            onPress={() => {
              navegation.goBack();
            }}
          >
            <Image
              source={require("../assets/icons/seta-esquerda.png")}
              style={styles.img}
            ></Image>
          </TouchableOpacity>
          <Titulo posicao={"esquerda"}></Titulo>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 20,
  },
  img: {
    width: 30,
    height: 30,
  },
});
