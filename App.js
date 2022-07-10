import React, { useState } from "react";
import { TouchableOpacity, Share } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Downloads from "./screens/Downloads";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { heightPercentage, widthPercentage } from "./Global/Dimensions";
import { mainColor } from "./Global/Color";
import { ContextApi } from "./functions/Context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PlayVideo from "./screens/PlayVideo";
import SettingsScreen from "./screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [changeStatus, setChangeStatus] = useState(false);

  const HeaderRightComponent = () => {
    const onShare = async () => {
      try {
        await Share.share({
          message:
            "https://play.google.com/store/apps/details?id=com.misdar.TikTokDownloader",
        });
      } catch (error) {
        alert(error.message);
      }
    };
    return (
      <TouchableOpacity onPress={onShare}>
        <Ionicons
          name="share-social-sharp"
          size={30}
          color="gray"
          style={{ marginRight: widthPercentage(5) }}
        />
      </TouchableOpacity>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // tabBarStyle: {
          //   backgroundColor: "#000",
          //   height: heightPercentage(10),
          //   borderWidth: 0,
          //   elevation: 0,
          // },
          headerRight: () => <HeaderRightComponent />,
          tabBarIcon: ({ color }) => {
            if (route.name === "Home") {
              return <AntDesign name="home" size={35} color={color} />;
            } else if (route.name === "Downloads") {
              return <Feather name="download" size={35} color={color} />;
            } else if (route.name === "Settings") {
              return <AntDesign name="setting" size={35} color={color} />;
            }
          },
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Downloads" component={Downloads} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <ContextApi.Provider value={{ changeStatus, setChangeStatus }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayVideo"
            component={PlayVideo}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApi.Provider>
  );
}
