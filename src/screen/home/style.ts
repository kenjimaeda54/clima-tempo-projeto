import { StyleSheet } from "react-native";
import { color } from "../../global/color";
import { fonts } from "../../global/fonts";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    paddingTop: getStatusBarHeight(),
  },
  viewHeader: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  viewHeaderContent: {
    width: 183,
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    marginHorizontal: 53,
  },
  textProps: {
    fontFamily: fonts.kanit_Ligth,
    fontSize: 16,
    color: color.textRed,
    lineHeight: 43,
  },
  viewMain: {
    flex: 1,
    zIndex: 1,
    width: "100%",
    height: 83,
    alignItems: "flex-start",
    paddingHorizontal: 19,
  },
  iconMain: {
    zIndex: 2,
    position: "relative",
    left: 250,
    marginBottom: -20,
    width: "100%",
    color: color.with,
    fontSize: 15,
  },
  textInput: {
    backgroundColor: color.blueSecondary,
    width: "100%",
    height: 27,
    borderRadius: 4,
    paddingHorizontal: 7,
    color: color.with,
  },
});
