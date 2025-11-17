import { StyleSheet, View, Text } from "react-native";

//componentes
import Fundo from "./components/fundo";
import BtnUniversal from "./components/btnuniversal";

export default function Conectar() {
  return (
    <Fundo>
      <View style={styles.caixaSuperior}>
        <View style={styles.caixaInfoBt}>
          <View style={styles.caixaTitulo}>
            <Text style={styles.titulo}>COMO SE</Text>
            <Text style={styles.titulo2}>CONECTAR</Text>
            <Text style={styles.paragrafo}>
              1-SE CONECTA AO{"\n"}PONTO DE ACESSO{"\n"}GERADO PELO{"\n"}
              DISPOSITIVO CENTRAL
            </Text>
            <Text style={styles.paragrafo}>
              2-CERTIFIQUE-SE QUE{"\n"}ESTÁ CONECTADO A REDE
            </Text>
          </View>
          <BtnUniversal icone={"acesso"}></BtnUniversal>
        </View>
        <Text style={styles.paragrafo2}>
          3-SCANEIA O QRCODE{"\n"}NO DISPOSITIVO CENTRAL
        </Text>
        <Text style={styles.paragrafo2}>
          4-UMA VEZ CONECTADO{"\n"}JÁ PODES USAR OS RECURSOS{"\n"}DO DISPOSITIVO
          CENTRAL
        </Text>
        <Text style={styles.subTitulo}>RECOMENDAÇÃO:</Text>
        <Text style={styles.paragrafo}>
          EM CASO DE FALHA NA CONEXÃO REINICIA O APP NO DISPOSITIVO CENTRAL
        </Text>
      </View>
      <View style={styles.caixaInferior}>
        <Text style={styles.subTitulo}>SCANEAR QRCODE</Text>
        <View style={styles.caixaBtn}>
          <BtnUniversal icone={"direita"}></BtnUniversal>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaSuperior: {
    flex: 1,
    padding: 20,
  },
  caixaInfoBt: {
    flexDirection: "row",
  },
  caixaTitulo: {
    gap: 20,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: 30,
    color: "#fff",
  },
  titulo2: {
    fontFamily: "Montserrat-Black",
    fontSize: 30,
    color: "#fff",
    marginTop: -30,
  },
  paragrafo: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    color: "#fff",
  },
  paragrafo2: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    color: "#fff",
    marginTop: 20,
  },
  subTitulo: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
  },
  caixaInferior: {
    width: "100%",
    height: "40%",
    padding: 20,
    alignItems: "center",
    gap:10
  },
  caixaBtn:{
    backgroundColor:'#fff',
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20
  }
});
