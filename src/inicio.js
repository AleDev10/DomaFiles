import {StyleSheet,View,Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

//componentes
import LetraInicial from "./components/letrainicial";
import BtnUniversal from "./components/btnuniversal";
import EntradaNome from "./components/entradanome";

export default function Inicio() {
    const navegation = useNavigation();
    
    return (
        <View style={styles.caixaPrincipal}>
            <View style={styles.caixaConteudo}>
                <LetraInicial letra={'A'}></LetraInicial>
                <View style={styles.caixaFormulario}>
                    <Text style={styles.textoBV}>BEM-VINDO</Text>
                    <Text style={styles.textoInfo}>DOMA é um app{'\n'}que permite que{'\n'}vários Despositivos{'\n'}se conectem para{'\n'}acessar o conteudo{'\n'}do Despositivo central </Text>
                    <EntradaNome cor={'branca'}></EntradaNome>
                    <BtnUniversal icone={'direita'} evento={()=>{
                        navegation.replace('HOME');
                    }}>
                    </BtnUniversal>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    caixaPrincipal:{
        flex:1,
        backgroundColor:'#ffff',
        paddingLeft:10,
        paddingRight:10,
        alignItems:'center',
        width:'100%'
    },
    caixaConteudo:{
        flex: 1,
        backgroundColor:'#63bbf2',
        alignItems:'center',
        gap:30,
        padding:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        width:'100%',
        marginTop:30
    },
    caixaFormulario:{
        backgroundColor:'#0f50a6',
        flex:1,
        padding:20,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        gap:20,
        width:'100%'
    },
    textoBV:{
        fontFamily: 'Montserrat-Black',
        color:'#ffff',
        fontSize: RFPercentage(4)
    },
    textoInfo:{
        color:'#ffff',
        fontFamily: 'Montserrat-Light',
        textAlign:'center',
        fontSize:RFPercentage(2)
    },
    entradaNome:{
        backgroundColor:'#ffff',
        width:210,
        padding:8,
        borderRadius:20,
        fontFamily: 'Montserrat-Bold',
        color:'#0f50a6',
        
    },
    botaoSeguinte:{
        backgroundColor:'#63bbf2',
        width:150,
        borderRadius:20,
        alignItems:'center'
    },
    setaDireita:{
        width:30,
        height:30
    }
})