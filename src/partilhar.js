import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

//COMPONENTES
import BtnUniversal from "./components/btnuniversal";
import Dispositivos from "./components/dispositivos";
import Fundo from "./components/fundo";

export default function Partilhar2() {
  const navegation = useNavigation();

  return (
    <Fundo style={styles.caixaPrincipal}>
      <View style={styles.caixaSuperior}>
        <View style={styles.caixaTextos}>
          <Text style={styles.titulo}>PARTILHAR</Text>
          <View style={styles.caixaParagrafos}>
            <Text style={styles.paragrafo}>
              liGUE OS OUTROS{"\n"}DISPOSITIVOS AO{"\n"}PONTO DE ACESSO{"\n"}
              DO SEU E SCANEIE{"\n"}O QRCODE
            </Text>
            <Text style={styles.paragrafo}>
              SE CERTIFIQUE QUE{"\n"}O PONTO DE ACESSO{"\n"}ESTÁ ATIVADO E QUE
              {"\n"}CADA DESPOSITIVO{"\n"}ESTÁ CONECTADO AO MESMO
            </Text>
            <Text style={styles.paragrafo}>
              OU DIGITE ESTE ENDEREÇO:{"\n"}http://192.168.0.1:5000
            </Text>
          </View>
        </View>
        <View>
          <BtnUniversal
            icone={"qrcode"}
            evento={() => {
              navegation.navigate("QRCODE");
            }}
          ></BtnUniversal>
        </View>
      </View>
      <View style={styles.caixaInferior}>
        <Text style={styles.textoDispositivos}>DISPOSITIVOS CONECTADOS</Text>
        <ScrollView style={styles.caixaDispositivos}>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
          <View style={styles.conectados}>
            <Dispositivos inicial={"A"} nome={"ALEXANDRE"}></Dispositivos>
          </View>
        </ScrollView>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaSuperior: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    height: "40%",
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.5),
    color: "#fff",
  },
  caixaParagrafos: {
    gap: 20,
  },
  paragrafo: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
    color: "#fff",
  },
  caixaInferior: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    gap: 10,
  },
  textoDispositivos: {
    fontFamily: "Montserrat-Bold",
    fontSize: RFPercentage(2),
    color: "#fff",
  },
  caixaDispositivos: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  conectados: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
});
