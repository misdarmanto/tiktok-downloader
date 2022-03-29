import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export const downloadFileHandler = async (content) => {
  console.log("start download...");
  const fileUri =
    content.type === "jpg"
      ? FileSystem.documentDirectory + "instagram.jpg"
      : FileSystem.documentDirectory + "instagram.mp4";
  try {
    const res = await FileSystem.downloadAsync(content.url, fileUri);
    saveFile(res.uri);
  } catch (e) {
    console.log(e);
  }
};

const saveFile = async (uri) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync("instagramDownloader");
    if (album === null) {
      await MediaLibrary.createAlbumAsync("instagramDownloader", asset);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("succsess");
};
