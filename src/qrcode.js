import { StyleSheet, View, Text, Image } from "react-native";

export default function Qrcode() {
  return (
    <View style={styles.caixaPrincipal}>
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
  caixaSecundaria: {
    backgroundColor: "#63bbf2",
    width: "100%",
    height: "88%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    gap:10
  },
  caixaTexto:{
    paddingLeft:10,
    paddingRight:10,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: 30,
    color: "#fff",
  },
  frase: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
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
    fontSize: 15,
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
    fontSize: 15,
    color:'#fff',
  }
});
