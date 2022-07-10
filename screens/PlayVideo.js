import React from "react";
import VideoPlayer from "expo-video-player";
import { StatusBar } from "expo-status-bar";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import { Text } from "react-native";
import { Video } from "expo-av";
import * as NavigationBar from 'expo-navigation-bar';


const PlayVideo = ({ route }) => {
  const { uri, title } = route.params;
  NavigationBar.setBackgroundColorAsync("#000");
  return (
    <>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: uri,
          },
        }}
        style={{
          videoBackgroundColor: "black",
          height: heightPercentage(100),
        }}
        header={
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              paddingTop: heightPercentage(1),
              paddingLeft: widthPercentage(3),
              position: "absolute",
              bottom: 0
            }}
          >
            {title}
          </Text>
        }
        fullscreen={{
          visible: false,
        }}
      />
      <StatusBar hidden={true}/>
      
    </>
  );
};

export default PlayVideo;
