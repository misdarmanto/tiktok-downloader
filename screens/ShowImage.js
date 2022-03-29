import React from "react";
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

const ShowImage = ({ route }) => {
  const { uri } = route.params;
  return (
    <>
      <ImageBackground
        source={{ uri: uri }}
        style={{ flex: 1 }}
        resizeMode="cover"
      />
      <StatusBar style="light" />
    </>
  );
};

export default ShowImage;
