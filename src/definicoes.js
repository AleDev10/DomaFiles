import { StyleSheet, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState } from "react";

//componentes
import LetraInicial from "./components/letrainicial";
import EntradaNome from "./components/entradanome";
import BtnUniversal from "./components/btnuniversal";
import Fundo from "./components/fundo";

//funções externas
import { buscarUmRegistro, inserirRegistro } from "./db/funcoesDB";



export default function Definicoes() {
  
  let retorno = buscarUmRegistro();
  const [nome, setNome] = useState(retorno.nome);
  const [letraNome, setLetraNome] = useState(retorno.nome.slice(0, 1));

  function validarTexto() {
    if (nome.trim() != "" && nome.trim() != retorno.nome) {
      console.log("Nome de usuario inserido:", nome.trim());
      inserirRegistro(nome.trim());
      retorno = buscarUmRegistro();
      setLetraNome(retorno.nome.slice(0, 1));
    }
  }

  function resetarConfigurações() {
    setNome(retorno.nome);
  }

  return (
    <Fundo>
      <View style={styles.caixaSegundaria}>
        <View style={styles.caixaLetra}>
          <LetraInicial letra={letraNome}></LetraInicial>
        </View>
        <View style={styles.caixaDetalhes}>
          <EntradaNome setValor={setNome} getValor={nome}></EntradaNome>
          <View style={styles.caixaParagrafo}>
            <Text style={styles.paragrafo1}>
              ESTE APP É OPEN SOURCE,O{"\n"}O CODIGO FONTE ESTÁ DISPONIVEL{"\n"}
              NO GITHUB DO PERFIL @ALEDEV10.
            </Text>
            <Text style={styles.paragrafo1}>
              "AS PESSOAS NOTAM QUE ELAS{"\n"}ESTÃO A FAZER O QUE ELAS AMAM
              {"\n"}
              QUANDO NÃO NOTAM O{"\n"}TEMPO A PASSAR."
            </Text>
          </View>
          <View style={styles.caixaBtns}>
            <BtnUniversal
              evento={() => {
                validarTexto();
              }}
              icone={"aceitar"}
            ></BtnUniversal>
            <BtnUniversal evento={()=>{
              resetarConfigurações();
            }} icone={"cancelar2"}></BtnUniversal>
          </View>
        </View>
      </View>
    </Fundo>
  );
}

const styles = StyleSheet.create({
  caixaSegundaria: {
    backgroundColor: "#63bbf2",
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  caixaParagrafo: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  paragrafo1: {
    fontFamily: "Montserrat-Bold",
    fontSize: RFPercentage(1.5),
  },
  caixaBtns: {
    flexDirection: "row",
    gap: 15,
  },
});
