import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export const downloadFileHandler = async (content) => {
  console.log("start download...");
  const fileUri = FileSystem.documentDirectory +"Tiktok"+Date.now()+".mp4";
  try {
    const res = await FileSystem.downloadAsync(content, fileUri);
    saveFile(res.uri);
  } catch (e) {
    console.log(e);
  }
};

const saveFile = async (uri) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync("TiktokDownloader");
    if (album === null) {
      await MediaLibrary.createAlbumAsync("TiktokDownloader", asset);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("succsess");
};
