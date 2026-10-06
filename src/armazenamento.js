import { StyleSheet, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState } from "react";

//componentes
import Fundo from "./components/fundo";
import BtnUniversal from "./components/btnuniversal";

export default function Armazenamento({route}) {
  const {url} = route.params;

  const [ip,setIp] = useState(url);

  return (
    <Fundo>
      <View style={styles.caixaPrincipal}>
        <Text style={styles.titulo}>ARMAZENAMENTO</Text>
        <Text style={styles.texto}>ACESSO LIMITADO PARA LEITURA</Text>
        <View style={styles.caixaArquivos}>
          <BtnUniversal icone={"arquivo"}>
            <Text>{ip}</Text>
          </BtnUniversal>
          <BtnUniversal icone={"arquivo"}>
            <Text>Armazena</Text>
          </BtnUniversal>
          <BtnUniversal icone={"arquivo"}>
            <Text>Armazena</Text>
          </BtnUniversal>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaPrincipal: {
    flex: 1,
    padding:10,
  },
  titulo:{
    fontFamily: "Montserrat-Black",
    fontSize: RFPercentage(3.5),
    color: "#fff",
  },
  texto:{
    fontFamily: "Montserrat-Medium",
    fontSize: RFPercentage(2),
    color: "#fff",
  },
  caixaArquivos:{
    backgroundColor:'#fff',
    flex:1,
    borderRadius:20,
    padding:20,
    marginTop:15
  }
});
