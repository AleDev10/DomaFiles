import * as FileSystem from "expo-file-system/legacy";

export async function downloadClient(uri) {
  try {
    console.log("downloadClient uri:",uri);
  } catch (error) {
    console.error("Erro ao baixar arquivo", error);
  }
}
