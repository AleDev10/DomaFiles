import { StyleSheet,TextInput } from "react-native";

export default function EntradaNome({cor,getValor,setValor}) {
    if (cor == 'branca') {
      return (
        <TextInput onChangeText={setValor} value={getValor} placeholder='NOME' style={styles.entradaBranca} underlineColorAndroid={'transparent'}>
        </TextInput>
    );  
    } else {
        return (
        <TextInput placeholder='NOME' style={styles.entradaAzul} underlineColorAndroid={'transparent'}>
        </TextInput>
    ); 
    }
    
}

const styles = StyleSheet.create({
    entradaBranca:{
        backgroundColor:'#ffff',
        width:210,
        padding:8,
        borderRadius:20,
        fontFamily: 'Montserrat-Bold',
        color:'#0f50a6',
        
    },
    entradaAzul:{
        backgroundColor:'#0f50a6',
        width:210,
        padding:8,
        borderRadius:20,
        fontFamily: 'Montserrat-Bold',
        color:'#fff',
    }
});