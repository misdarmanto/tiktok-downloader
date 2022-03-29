import React, { useEffect, useState, useContext } from "react";
import { View, Image, ScrollView, TouchableOpacity, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import { ContextApi } from "../functions/Context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import interstitialAdd from "../Adds/InterstitialAdd";

export default function Downloads() {
  const [images, setImages] = useState([]);
  const { changeStatus } = useContext(ContextApi);
  const [count, setCount] = useState(1);
  const [noImage, setNoImage] = useState(false);
  const navigation = useNavigation();

  const getData = async () => {
    const getPhoto = await MediaLibrary.getAlbumAsync("instagramDownloader");
    if (getPhoto === null) {
      setNoImage(true);
      return;
    }
    const getAllPhoto = await MediaLibrary.getAssetsAsync({
      album: getPhoto,
      sortBy: ["creationTime"],
      mediaType: ["photo"],
    });
    setImages(getAllPhoto.assets);
  };

  useEffect(() => {
    getData();
  }, [changeStatus]);

  const imageOnClick = (uri) => {
    if (count % 5 === 0) interstitialAdd();
    setCount(count + 1);
    navigation.navigate("ShowImage", { uri: uri });
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
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => imageOnClick(image.uri)}
            >
              <Image
                style={{
                  width: widthPercentage(33),
                  height: heightPercentage(20),
                  marginHorizontal: widthPercentage(0.2),
                  marginVertical: heightPercentage(0.1),
                }}
                resizeMode="cover"
                source={{ uri: image.uri }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <StatusBar style="light" />
    </ScrollView>
  );
}
