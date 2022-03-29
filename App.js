import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Downloads from "./screens/Downloads";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { heightPercentage } from "./Global/Dimensions";
import { mainColor } from "./Global/Color";
import { ContextApi } from "./functions/Context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowImage from "./screens/ShowImage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [changeStatus, setChangeStatus] = useState(false);

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === "Home") {
              return <AntDesign name="home" size={40} color={color} />;
            } else {
              return <Feather name="download" size={40} color={color} />;
            }
          },
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: heightPercentage(8) },
          headerTitleAlign: "center",
          tabBarHideOnKeyboard: true
          
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Downloads" component={Downloads} />
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
          <Stack.Screen name="ShowImage" component={ShowImage} options={{title: "images"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApi.Provider>
  );
}
