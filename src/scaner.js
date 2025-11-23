import { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CameraView } from "expo-camera";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

//componentes
import BtnUniversal from "./components/btnuniversal";

export default function Scaner() {
  const navegation = useNavigation();
  const qrcodeFechado = useRef(false);

  return (
    <View style={styles.caixaPrincipal}>
      <Text style={styles.titulo}>SCANEAR QRCODE</Text>
      <CameraView style={styles.caixaQrcode} facing="back" onBarcodeScanned={({data})=>{
        if (data && !qrcodeFechado.current) {
            qrcodeFechado.current=true;
            setTimeout(()=>{
                console.log(data);
                qrcodeFechado.current=false;
                navegation.goBack();
            },500);
        }
      }}>
        <Text style={styles.caixaTexto}>.</Text>
      </CameraView>
      <BtnUniversal icone={"cancelar"} evento={()=>{
        navegation.goBack();
      }}></BtnUniversal>
    </View>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    backgroundColor: "#0f50a6",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    padding: 30,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(2.5),
    color: "#fff",
  },
  caixaQrcode: {
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
  },
});
