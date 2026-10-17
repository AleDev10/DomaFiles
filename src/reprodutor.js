import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

export default function Reprodutor({ route }) {
  const { dados, url } = route.params;
  const requisicao = `${url}/stream?uri=${dados.uri}&nome=${dados.name}&size=${dados.size}&mimeType=video/mp4`;

  console.log(requisicao);

  const player = useVideoPlayer(dados.uri, (player) => {
    player.loop = false;
    player.play();
    player.volume=1.0;
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{ enable: true,orientation:"landscape" }}
        allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#0f50a6",
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 350,
  },
  controlsContainer: {
    padding: 10,
  },
});
