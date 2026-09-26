import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import { useState } from "react";

//componentes
import BtnUniversal from "./components/btnuniversal";
import Carregar from "./components/carregar";
import Erro from "./components/erro";
import FundoHome from "./components/fundoHome";

export default function Home() {
  const navegation = useNavigation();

  const [estado, setEstado] = useState("pronto");
  const [mensagemErro, setMensagemErro] = useState("");

  async function ativarHostpot() {
    try {
      const resultado = await startActivityAsync(
        ActivityAction.TETHER_SETTINGS,
      );

      if (!resultado) {
        setEstado("carregando");
        return;
      }

      setEstado("pronto");
      navegation.navigate("PARTILHAR");
    } catch (erro) {
      console.error("Erro HOSTPOT: ", erro);
      setMensagemErro(`Erro HOSTPOT: ${erro}`);
      setEstado("erro");
    }
  }

  if (estado === "carregando") return <Carregar tipo="fundohome"></Carregar>;
  if (estado === "erro") return <Erro mensagem={mensagemErro} tipo="tipo3" />;

  return (
    <FundoHome>
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
    </FundoHome>
  );
}

const styles = StyleSheet.create({
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
