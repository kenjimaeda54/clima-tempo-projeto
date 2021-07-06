import React from "react";
import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { style } from "./style";
import { color } from "../../global/color";

type HeaderProps = {
  handleNavigation: () => void;
};

export const Header = ({ handleNavigation }: HeaderProps) => {
  return (
    <View style={style.container}>
      <BorderlessButton onPress={handleNavigation}>
        <FontAwesome5
          style={style.icon}
          name="arrow-left"
          size={30}
          color={color.blueSecondary}
        />
      </BorderlessButton>
    </View>
  );
};
