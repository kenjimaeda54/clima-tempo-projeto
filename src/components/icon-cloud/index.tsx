import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { color } from "../../global/color";

type IconCloudProps = {
  name: string;
};

export const IconCloud = ({ name }: IconCloudProps) => (
  <FontAwesome5 name={name} size={50} color={color.bluePrimary} />
);
