import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";

export default function BtnUniversal({ icone, evento }) {
  switch (icone) {
    case "direita":
      return (
        <TouchableOpacity onPress={evento} style={styles.botaoSeguinte}>
          <Image
            source={require("../assets/icons/seta-direita.png")}
            style={styles.iconeBtn}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "esquerda":
      return (
        <TouchableOpacity onPress={evento} style={styles.botaoSeguinte}>
          <Image
            source={require("../assets/icons/seta-esquerda.png")}
            style={styles.iconeBtn}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "cancelar":
      return (
        <TouchableOpacity onPress={evento} style={styles.botaoSeguinte}>
          <Image
            source={require("../assets/icons/close-white.png")}
            style={styles.iconeBtn}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "partilhar":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnAzul}>
          <Image
            source={require("../assets/icons/ios-share-blue.png")}
            style={styles.imgBtnAzul}
          ></Image>
          <Text style={styles.textoBtnAzul}>PARTILHAR</Text>
        </TouchableOpacity>
      );
      break;
    case "conectar":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnAzul}>
          <Image
            source={require("../assets/icons/broadcast-blue.png")}
            style={styles.imgBtnAzul}
          ></Image>
          <Text style={styles.textoBtnAzul}>CONECTAR</Text>
        </TouchableOpacity>
      );
      break;
    case "definicoes":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnBranco}>
          <Image
            source={require("../assets/icons/settings.png")}
            style={styles.imgBranco}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "aceitar":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnVerificar}>
          <Image
            source={require("../assets/icons/check.png")}
            style={styles.imgVerificar}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "cancelar2":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnVerificar}>
          <Image
            source={require("../assets/icons/close-white.png")}
            style={styles.imgVerificar}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "qrcode":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnQrcode}>
          <Image
            style={styles.imgQrcode}
            source={require("../assets/icons/qrcode.png")}
          ></Image>
        </TouchableOpacity>
      );
      break;
    case "acesso":
      return (
        <TouchableOpacity onPress={evento} style={styles.btnQrcode}>
          <Image
            style={styles.imgQrcode}
            source={require("../assets/icons/broadcast-black.png")}
          ></Image>
        </TouchableOpacity>
      );
      break;

    default:
      return (
        <TouchableOpacity style={styles.botaoSeguinte}>
          <Text style={styles.textoBtn}>Erro no botão</Text>
        </TouchableOpacity>
      );
      break;
  }
}

const styles = StyleSheet.create({
  botaoSeguinte: {
    backgroundColor: "#63bbf2",
    width: 150,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconeBtn: {
    width: 30,
    height: 30,
  },
  textoBtn: {
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    fontSize: 15,
  },
  btnAzul: {
    backgroundColor: "#0f50a6",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
    gap: 5,
  },
  imgBtnAzul: {
    width: 40,
    height: 40,
  },
  textoBtnAzul: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
  },
  btnBranco: {
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
  },
  imgBranco: {
    width: 40,
    height: 40,
  },
  btnVerificar: {
    backgroundColor: "#0f50a6",
    width: 120,
    alignItems: "center",
    borderRadius: 20,
  },
  imgVerificar: {
    width: 40,
    height: 40,
  },
  btnQrcode: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  imgQrcode: {
    width: 120,
    height: 120,
  }
});
