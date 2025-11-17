import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//janelas
import Inicio from "./src/inicio";
import Home from "./src/home";
import Definicoes from "./src/definicoes";
import Partilhar from "./src/partilhar";
import Qrcode from "./src/qrcode";
import Conectar from "./src/conectar";

//componentes
import Titulo from "./src/components/titulo";
import Cabecalho from "./src/components/cabecalho";

const RooStack = createNativeStackNavigator({
  initialRouteName:'INICIO',
  screenOptions:{
    headerShadowVisible:false
  },
  screens:{
    INICIO:{
      screen:Inicio,
      options:{
        headerTitleAlign:'center',
        headerTitle:()=><Titulo></Titulo>
      }
    },
    HOME:{
      screen:Home,
      options:{
        headerShown:false
      }
    },
    DEFINICOES:{
      screen:Definicoes,
      options:{
        header:()=><Cabecalho></Cabecalho>,
        headerTransparent:true
      }
    },
    PARTILHAR:{
      screen:Partilhar,
      options:{
        header:()=><Cabecalho tipo={'verificado'}></Cabecalho>,
        headerTransparent:true
      }
    },
    QRCODE:{
      screen:Qrcode,
      options:{
        header:()=><Cabecalho></Cabecalho>,
        headerTransparent:true
      }
    },
    CONECTAR:{
      screen:Conectar,
      options:{
        header:()=><Cabecalho></Cabecalho>,
        headerTransparent:true
      }
    }
  }
});

const Navigation = createStaticNavigation(RooStack);

export default function App() {

  const [loaded,error] = useFonts({
    'Montserrat-Black':require('./src/assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold':require('./src/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium':require('./src/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular':require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light':require('./src/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Thin':require('./src/assets/fonts/Montserrat-Thin.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
    <StatusBar style='auto'></StatusBar>
    <Navigation></Navigation>
    </>
  );
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:"Montserrat-Bold"
  },
});
