import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { startActivityAsync } from "expo-intent-launcher";

//componentes
import BtnUniversal from "./components/btnuniversal";

export default function Home() {
  const navegation = useNavigation();

  async function ativarHostpot() {
    try {
      await startActivityAsync("android.settings.TETHER_SETTINGS");
      navegation.navigate("PARTILHAR");
    } catch (error) {
      console.error("Erro abrindo HOSTPOT");
    }
  }

  return (
    <View style={styles.caixaPrincipal}>
      <View style={styles.caixaTexto}>
        <Text style={styles.titulo}>DOMA</Text>
        <Text style={styles.frase}>
          COMPARTILHA COM AS{"\n"}PESSOAS AO TEU REDOR
        </Text>
      </View>
      <View style={styles.caixaBtns}>
        <View style={styles.caixaBtnsAzul}>
          <BtnUniversal
            icone={"partilhar"}
            evento={() => {
              ativarHostpot();
            }}
          ></BtnUniversal>
          <BtnUniversal
            icone={"conectar"}
            evento={() => {
              navegation.navigate("CONECTAR");
            }}
          ></BtnUniversal>
        </View>
        <View style={styles.caixaBtnBranco}>
          <BtnUniversal
            icone={"definicoes"}
            evento={() => {
              navegation.navigate("DEFINICOES");
            }}
          ></BtnUniversal>
        </View>
      </View>
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
  caixaBtnsAzul: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  caixaBtnBranco: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
});
