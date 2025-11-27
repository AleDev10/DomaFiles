import { StyleSheet, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import {useCameraPermissions } from 'expo-camera';

//componentes
import Fundo from "./components/fundo";
import BtnUniversal from "./components/btnuniversal";

export default function Conectar() {

  const navegation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();

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
          <BtnUniversal icone={"direita"} evento={()=>{
            navegation.navigate('ARMAZENAMENTO');
            /* if (!permission.granted) {
                requestPermission();
              }else{
                navegation.navigate('SCANER');
              } */
          }}></BtnUniversal>
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
    justifyContent:'space-between'
  },
  caixaTitulo: {
    gap: 20,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(4),
    color: "#fff",
  },
  titulo2: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.4),
    color: "#fff",
    marginTop: -30,
  },
  paragrafo: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
    color: "#fff",
  },
  paragrafo2: {
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
    color: "#fff",
    marginTop: 20,
  },
  subTitulo: {
    fontFamily: "Montserrat-Bold",
    fontSize: RFPercentage(2),
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
