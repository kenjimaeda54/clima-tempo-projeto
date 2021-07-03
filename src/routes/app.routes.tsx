import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screen/home";
import { FilterCity } from "../screen/filter-city";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      initialRouteName="home"
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Screen name="City" component={FilterCity} />
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  );
};
