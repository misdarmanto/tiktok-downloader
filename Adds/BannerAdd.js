import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { View } from "react-native";


const test = "ca-app-pub-3940256099942544/6300978111" //test ad
const production = "ca-app-pub-8095237298596091/6548355612"
function BannerAdd(){
  return (
    <View>
      <AdMobBanner
        adUnitID={production}
        bannerSize={"fullBanner"}
        onDidFailToReceiveAdWithError={() => console.log("error")}
      />
    </View>
  );
};

export default BannerAdd