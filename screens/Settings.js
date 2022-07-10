import React from "react";
import { Text, TouchableOpacity, Share } from "react-native";
import Layout from "../Global/Layout";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import * as StoreReview from "expo-store-review";
import { Linking } from "react-native";
// import * as MediaLibrary from "expo-media-library";

const androidPackageName = "com.misdar.TikTokDownloader";

const SettingsScreen = () => {
  const riviewPlayStore = async () => {
    if (await StoreReview.hasAction()) {
      Linking.openURL(
        `market://details?id=${androidPackageName}&showAllReviews=true`
      );
      StoreReview.requestReview();
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `https://play.google.com/store/apps/details?id=${androidPackageName}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <ButtonList onPress={riviewPlayStore}>
        <Text style={{ fontSize: 18 }}>Beri rating aplikasi ini</Text>
        <AntDesign name="staro" size={35} color="black" />
      </ButtonList>
      <ButtonList onPress={onShare}>
        <Text style={{ fontSize: 18 }}>Bagikan aplikasi ini</Text>
        <Entypo name="share" size={35} color="black" />
      </ButtonList>
      {/* <ButtonList>
        <Text style={{ fontSize: 18 }}>Hapus download</Text>
        <Feather name="trash" size={35} color="black" />
      </ButtonList> */}
      <StatusBar style="auto" backgroundColor="#FFF" />
    </Layout>
  );
};

const ButtonList = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: widthPercentage(5),
        borderRadius: 20,
        borderWidth: 1,
        marginVertical: heightPercentage(1),
        borderColor: "#e3e3e3",
        height: heightPercentage(10),
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default SettingsScreen;
