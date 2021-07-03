import React from "react";
import { StatusBar, View } from "react-native";
import { Background } from "./src/components/background";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Kanit_300Light,
  Kanit_400Regular,
  Kanit_500Medium,
} from "@expo-google-fonts/kanit";
import { Routes } from "./src/routes";
import "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Kanit_300Light,
    Kanit_400Regular,
    Kanit_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" translucent />
      <Routes />
    </Background>
  );
}
