import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentage, heightPercentage } from "./Dimensions";

export default function Layout({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentage(2),
    backgroundColor: "#FFF",
  },
});
