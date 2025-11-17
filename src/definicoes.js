import { StyleSheet, View, Text } from "react-native";

//componentes
import LetraInicial from "./components/letrainicial";
import EntradaNome from "./components/entradanome";
import BtnUniversal from "./components/btnuniversal";

export default function Definicoes() {
  return (
    <View style={styles.caixaPrincipal}>
      <View style={styles.caixaSegundaria}>
        <View style={styles.caixaLetra}>
          <LetraInicial letra={"A"}></LetraInicial>
        </View>
        <View style={styles.caixaDetalhes}>
          <EntradaNome></EntradaNome>
          <View style={styles.caixaParagrafo}>
            <Text style={styles.paragrafo1}>
              ESTE APP É OPEN SOURCE,O{"\n"}O CODIGO FONTE ESTÁ DISPONIVEL{"\n"}
              NO GITHUB DO PERFIL @ALEDEV10.
            </Text>
            <Text style={styles.paragrafo2}>
              "AS PESSOAS NOTAM QUE ELAS{"\n"}ESTÃO A FAZER O QUE ELAS AMAM{"\n"}
              QUANDO NÃO NOTAM O TEMPO A PASSAR".
            </Text>
          </View>
          <View style={styles.caixaBtns}>
            <BtnUniversal icone={"aceitar"}></BtnUniversal>
            <BtnUniversal icone={"cancelar2"}></BtnUniversal>
          </View>
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  caixaLetra: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  caixaDetalhes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 20,
    gap: 30,
  },
  caixaParagrafo:{
    alignItems:'center',
    gap:10
  },
  paragrafo1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
  },
  paragrafo2: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    marginLeft:20
  },
  caixaBtns: {
    flexDirection: "row",
    gap: 15,
  },
});
