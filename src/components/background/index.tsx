import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type BackgroundProps = {
  children: ReactNode;
};

export const Background = ({ children }: BackgroundProps) => (
  <LinearGradient style={{ flexGrow: 1 }} colors={["#CFD9DF", "#E2EBF0"]}>
    {children}
  </LinearGradient>
);
