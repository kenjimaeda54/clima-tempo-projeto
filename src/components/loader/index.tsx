import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { color } from "../../global/color";
import { style } from "../loader/style";

export const Loader = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={color.bluePrimary} />
      <Text style={style.message}> Carregando aguarde </Text>
    </View>
  );
};
