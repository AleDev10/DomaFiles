import { useCallback, useMemo, useRef, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Dispositivos from "./dispositivos";

export default function ModalButom({ url }) {
  const [diretorios, setDiretorios] = useState([]);
  const [nome, setNome] = useState("");
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["75%", "95%"], []);

  const abrir = () => {
    sheetRef.current?.present();
  };

  const fechar = () => {
    sheetRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  async function criarDiretorio(nomeDir) {
    try {
      const diretorio = await fetch(`${url}/diretorio`, {
        method: "POST",
        body: JSON.stringify({
          nome: nomeDir,
        }),
      });

      if (!diretorio.ok) {
        console.error("Falha ao buscar diretorios");
      }

      const diretorioDados = await diretorio.json();
      console.log(diretorioDados.dados.diretorio);
      setDiretorios((dir) => [...dir, diretorioDados.dados.diretorio]);
    } catch (error) {
      console.error("Erro ao criar diretorio");
    }
  }

  function validarTexto() {
    const nomeDiretorio = nome.trim();
    if (nomeDiretorio != "") {
      console.log(nomeDiretorio);
      console.log(url);
      setNome("");
      criarDiretorio(nomeDiretorio);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoAbrir} onPress={abrir}>
        <Text style={styles.textoBotao}>Adicionar Diretorio</Text>
      </Pressable>

      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={styles.fundo}
        handleIndicatorStyle={styles.indicador}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView style={styles.conteudo}>
          <View style={styles.cabecalho}>
            <Pressable onPress={fechar}>
              <Text style={styles.fechar}>✕</Text>
            </Pressable>

            <Text style={styles.titulo}>Novo diretorio</Text>

            <View style={{ width: 24 }} />
          </View>

          <TextInput
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
            style={styles.input}
          />

          <Pressable onPress={validarTexto} style={styles.botaoGuardar}>
            <Text style={styles.textoBotao}>Criar</Text>
          </Pressable>
          <ScrollView style={styles.caixaDispositivos}>
            {diretorios.map((dir,i) => (
              <View style={styles.conectados} key={i}>
                <Dispositivos tipo="diretorio" nome={dir.nome} />
              </View>
            ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  botaoAbrir: {
    backgroundColor: "#0f50a6",
    padding: 16,
    borderRadius: 20,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
  fundo: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  indicador: {
    backgroundColor: "#90989A",
    width: 60,
  },
  conteudo: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  fechar: {
    fontSize: 24,
    color: "#222222",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "500",
    color: "#222222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A0A5A5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  botaoGuardar: {
    backgroundColor: "#63bbf2",
    padding: 18,
    borderRadius: 30,
    marginTop: "auto",
    marginBottom: 16,
  },
  caixaDispositivos: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0f50a6",
    borderRadius: 20,
  },
  conectados: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
});
