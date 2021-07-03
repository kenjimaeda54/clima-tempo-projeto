import { StyleSheet } from "react-native";
import { color } from "../../global/color";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: 54,
    width: "100%",
    backgroundColor: color.bluePrimary,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: {
    marginHorizontal: 34,
  },
});
