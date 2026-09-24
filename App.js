import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

//janelas
import Inicio from "./src/inicio";
import Home from "./src/home";
import Definicoes from "./src/definicoes";
import Partilhar from "./src/partilhar";
import Conectar from "./src/conectar";
import Scaner from "./src/scaner";
import Armazenamento from "./src/armazenamento";

//componentes
import Titulo from "./src/components/titulo";
import Cabecalho from "./src/components/cabecalho";

//Funções externas
import { buscarUmRegistro, CriarDB } from "./src/db/funcoesDB";
import Erro from "./src/components/erro";
import Carregar from "./src/components/carregar";

const fontes = {
  "Montserrat-Black": require("./src/assets/fonts/Montserrat-Black.ttf"),
  "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
  "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
  "Montserrat-Thin": require("./src/assets/fonts/Montserrat-Thin.ttf"),
};

const telas = {
  INICIO: {
    screen: Inicio,
    options: {
      headerTitleAlign: "center",
      headerTitle: () => <Titulo />,
    },
  },
  HOME: {
    screen: Home,
    options: {
      headerShown: false,
    },
  },
  DEFINICOES: {
    screen: Definicoes,
    options: {
      header: () => <Cabecalho />,
      headerTransparent: true,
    },
  },
  PARTILHAR: {
    screen: Partilhar,
    options: {
      header: () => <Cabecalho />,
      headerTransparent: true,
    },
  },
  CONECTAR: {
    screen: Conectar,
    options: {
      header: () => <Cabecalho />,
      headerTransparent: true,
    },
  },
  SCANER: {
    screen: Scaner,
    options: {
      headerShown: false,
    },
  },
  ARMAZENAMENTO: {
    screen: Armazenamento,
    options: {
      header: () => <Cabecalho />,
      headerTransparent: true,
    },
  },
};

function iniciarBancoDeDados() {
  CriarDB();
  const registo = buscarUmRegistro();
  return registo ? "HOME" : "INICIO";
}

export default function App() {
  const [fontesCarregadas, erroFontes] = useFonts(fontes);

  const [Navigation, setNavigation] = useState(null);
  const [erroBanco, setErroBanco] = useState(null);

  useEffect(() => {
    try {
      const rotaInicial = iniciarBancoDeDados();

      const RooStack = createNativeStackNavigator({
        initialRouteName: rotaInicial,
        screenOptions: { headerShadowVisible: false },
        screens: telas,
      });

      setNavigation(() => createStaticNavigation(RooStack));
    } catch (erro) {
      console.error("Erro ao inicializar");
      setErroBanco(erro);
    }
  }, []);

  if (erroBanco) {
    return (
      <>
        <StatusBar style="auto"></StatusBar>
        <Erro mensagem="Erro com banco de dados" tipo="tipo1"/>
      </>
    );
  }

  if (erroFontes) {
    return (
      <>
        <StatusBar style="auto"></StatusBar>
        <Erro mensagem="Erro com as fontes" tipo="tipo1"/>
      </>
    );
  }

  if (!fontesCarregadas || !Navigation) {
    return (
      <>
        <StatusBar style="auto"></StatusBar>
        <Carregar tipo="fundoInicio"/>
      </>
    );
  }

  return (
    <>
      <StatusBar style="auto"></StatusBar>
      <Navigation></Navigation>
    </>
  );
}
