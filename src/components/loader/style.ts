import { StyleSheet } from "react-native";
import { color } from "../../global/color";
import { fonts } from "../../global/fonts";

export const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontFamily: fonts.Kanit_Medium,
    fontSize: 15,
    lineHeight: 17,
    color: color.bluePrimary,
  },
});
