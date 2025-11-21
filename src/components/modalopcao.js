
import { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//componentes
import BtnUniversal from "./btnuniversal";

export default function ModalOpcao() {
    const [visibilidade,setVisibilidade] = useState(true);
  return (
    <Modal visible={visibilidade} animationType="fade" transparent={true}>
      <View style={styles.caixaPrincipal}>
        <View style={styles.caixaSecundaria}>
          <Text style={styles.titulo}>SAIR</Text>
          <Text style={styles.paragrafo}>
            TEM A CERTEZA QUE{"\n"}QUER SAIR DESTA PAGINA?
          </Text>
          <View style={styles.caixaBtns}>
            <BtnUniversal icone={"aceitar"} evento={()=>{
              setVisibilidade(false);
            }}></BtnUniversal>
            <BtnUniversal icone={"cancelar2"} evento={()=>{
              setVisibilidade(false);
            }}></BtnUniversal>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  caixaSecundaria: {
    backgroundColor: "#fff",
    width: 300,
    height: 300,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  titulo: {
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(4.5),
    color:'#0f50a6'
  },
  paragrafo:{
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(2),
    textAlign:'center'
  },
  caixaBtns:{
    flexDirection:'row',
    gap:10
  }
});
