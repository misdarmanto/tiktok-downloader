import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { downloadFileHandler } from "../functions/handleDownload";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import { mainColor } from "../Global/Color";
import Layout from "../Global/Layout";
import ToolTip from "../Components/Tooltip";
import { ContextApi } from "../functions/Context";
import BannerAdd from "../Adds/BannerAdd";
import interstitialAdd from "../Adds/InterstitialAdd";
import RewardedAdd from "../Adds/RewardedAdd";

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const { changeStatus, setChangeStatus } = useContext(ContextApi);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted" || status === "denied") {
        openAppSettings();
      }
    };
    askPermission();
  }, []);

  const tooltip = () => {
    setDisplayTooltip(true);
    setTimeout(() => setDisplayTooltip(false), 2000);
  };

  const handleDownload = async () => {
    Keyboard.dismiss();
    // interstitialAdd();
    if (inputUrl === "") return;
    try {
      console.log("start download.....");
      tooltip();
      setLoading(true);
      const fectData = await fetch(
        "https://myinstasc.herokuapp.com/instagram/download",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: inputUrl,
          }),
        }
      );
      const result = await fectData.json();
      const key = Object.keys(result);
      for (let i = 0; i < Object.keys(result).length - 2; i++) {
        await downloadFileHandler(result[key[i]]);
      }
      tooltip();
      setInputUrl("");
      setChangeStatus(!changeStatus);
      setLoading(false);
      RewardedAdd();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {displayTooltip ? (
        loading ? (
          <ToolTip title={"Download in Progress"} />
        ) : (
          <ToolTip title={"Download Success"} />
        )
      ) : null}
      <View style={styles.content}>
        <TextInput
          style={[styles.inputStyle, styles.inputUrlStyle]}
          onChangeText={setInputUrl}
          value={inputUrl}
          placeholder="Link to the post..."
        />
        <TouchableOpacity
          style={[styles.inputStyle, styles.buttonDownloadStyle]}
          onPress={handleDownload}
          disabled={loading ? true : false}
        >
          {loading ? (
            <Text style={styles.textStyle}>Loading...</Text>
          ) : (
            <Text style={styles.textStyle}>Download</Text>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: heightPercentage(16),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BannerAdd />
      </View>
      <StatusBar style="light" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    height: heightPercentage(40),
    alignItems: "center",
    marginTop: heightPercentage(20),
  },
  inputStyle: {
    height: heightPercentage(7),
    width: widthPercentage(85),
    borderRadius: 30,
    paddingHorizontal: widthPercentage(5),
  },
  inputUrlStyle: {
    marginVertical: heightPercentage(1),
    borderWidth: 1,
    textAlign: "center",
    borderColor: "gray",
    color: "gray",
  },
  buttonDownloadStyle: {
    marginVertical: heightPercentage(1),
    backgroundColor: mainColor,
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
  },
});
