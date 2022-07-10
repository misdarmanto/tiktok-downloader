import React, { useEffect, useState, useContext } from "react";
import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import { ContextApi } from "../functions/Context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import interstitialAdd from "../Adds/InterstitialAdd";

export default function Downloads() {
  const [videos, setVideos] = useState([]);
  const { changeStatus } = useContext(ContextApi);
  const [count, setCount] = useState(1);
  const [noImage, setNoImage] = useState(false);
  const navigation = useNavigation();

  const getData = async () => {
    const getPhoto = await MediaLibrary.getAlbumAsync("TiktokDownloader");
    if (getPhoto === null) {
      setNoImage(true);
      return;
    }
    const getAllPhoto = await MediaLibrary.getAssetsAsync({
      album: getPhoto,
      sortBy: ["creationTime"],
      mediaType: ["video"],
    });
    setVideos(getAllPhoto.assets);
  };
  
  useEffect(() => {
    getData();
  }, [changeStatus]);

  const thumbnailOnClick = (value) => {
    if (count % 5 === 0) interstitialAdd();
    setCount(count + 1);
    navigation.navigate("PlayVideo", { uri: value.uri, title : value.filename });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FFF" }}
    >
      {noImage ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: heightPercentage(40),
          }}
        >
          <Text>no downloads found</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {videos.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => thumbnailOnClick(value)}
            >
              <Image
                style={{
                  width: widthPercentage(49.4),
                  height: heightPercentage(50),
                  marginHorizontal: widthPercentage(0.2),
                  marginVertical: heightPercentage(0.1),
                }}
                resizeMode="cover"
                source={{ uri: value.uri }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <StatusBar style="auto" backgroundColor="#FFF" />
    </ScrollView>
  );
}
