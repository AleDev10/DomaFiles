import { StyleSheet, View, Text, Image } from "react-native";
import { RFPercentage,RFValue } from "react-native-responsive-fontsize";

//componentes
import Fundo from "./components/fundo";

export default function Qrcode() {
  return (
    <Fundo>
      <View style={styles.caixaSecundaria}>
        <View style={styles.caixaTexto}>
          <Text style={styles.titulo}>QRCODE</Text>
          <Text style={styles.frase}>SCANEIE PARA SE CONECTAR</Text>
        </View>
        <View style={styles.caixaQrcode}>
          <Image source={require('./assets/icons/qrcodelink.png')} style={styles.qrcode} ></Image>
          <Text style={styles.textoOpcao}>OU DIGITE</Text>
          <View style={styles.caixaUrl}>
            <Text style={styles.textoUrl}>http://192.168.0.1:5000</Text>
          </View>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaSecundaria: {
    width: "100%",
    height: "100%",
    padding: 10,
    gap:10
  },
  caixaTexto:{
    paddingLeft:10,
    paddingRight:10,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.5),
    color: "#fff",
  },
  frase: {
    fontFamily: "Montserrat-Medium",
    fontSize:RFPercentage(1.5),
    color: "#fff",
  },
  caixaQrcode:{
    backgroundColor:'#fff',
    padding:20,
    borderRadius:20,
    alignItems:'center',
    gap:10,
    height:'65%'
  },
  qrcode:{
    width:300,
    height:300
  },
  textoOpcao:{
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(1.5),
  },
  caixaUrl:{
    backgroundColor:'#0f50a6',
    padding:20,
    alignItems:'center',
    borderRadius:20,
    width:'100%'
  },
  textoUrl:{
    fontFamily: "Montserrat-Medium",
    fontSize: RFValue(15),
    color:'#fff',
  }
});
