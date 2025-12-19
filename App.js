import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font';
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { buscarUmRegistro,CriarDB,inserirRegistro } from "./src/db/funcoesDB";


//janelas
import Inicio from "./src/inicio";
import Home from "./src/home";
import Definicoes from "./src/definicoes";
import Partilhar from "./src/partilhar";
import Qrcode from "./src/qrcode";
import Conectar from "./src/conectar";
import Scaner from "./src/scaner";
import Armazenamento from "./src/armazenamento";

//componentes
import Titulo from "./src/components/titulo";
import Cabecalho from "./src/components/cabecalho";

let primeiraInicializacao = false;

CriarDB();
buscarUmRegistro();
inserirRegistro("doma");


const RooStack = createNativeStackNavigator({
  initialRouteName:'',
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
    },
    SCANER:{
      screen:Scaner,
      options:{
        headerShown:false
      }
    },
    ARMAZENAMENTO:{
      screen:Armazenamento,
      options:{
        header:()=><Cabecalho></Cabecalho>,
        headerTransparent:true
      }
    }
  }
});

if (!primeiraInicializacao) {
  RooStack.config.initialRouteName='INICIO';
  primeiraInicializacao=true;
} else {
  RooStack.config.initialRouteName='HOME';
}

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
