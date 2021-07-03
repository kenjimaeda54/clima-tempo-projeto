import React from "react";
import { View, Text, TextInput } from "react-native";
import { style } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "../../global/color";
import { IconCloud } from "../../components/icon-cloud";

export const HomeScreen = () => {
  return (
    <View style={style.container}>
      <View style={style.viewHeader}>
        <View style={style.viewHeaderContent}>
          <IconCloud name="cloud-showers-heavy" />
          <Text style={style.textProps}>São Paulo 15 Cº F</Text>
        </View>
      </View>
      <View style={style.viewMain}>
        <Text style={style.textProps}>
          Escreva o nome da cidade que deseja pesquisar
        </Text>
        <MaterialIcons
          style={style.iconMain}
          name="search"
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Cidade que deseja pesquisar"
          placeholderTextColor={color.with}
          style={style.textInput}
          autoFocus
          maxLength={30}
        />
      </View>
    </View>
  );
};
