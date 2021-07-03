import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { color } from "../../global/color";
import { fonts } from "../../global/fonts";

export const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: getStatusBarHeight(),
  },
  iconHeader: {
    width: "100%",
    marginTop: 22,
    display: "flex",
    alignItems: "flex-end",
    paddingHorizontal: 34,
  },
  viewMain: {
    flexGrow: 1,
    height: 310,
    width: "100%",
    padding: 26,
    marginTop: 150,
  },
  textMain: {
    fontFamily: fonts.kanit_Ligth,
    marginVertical: 5,
    fontSize: 12,
    lineHeight: 14,
    color: color.textRed,
  },
  viewPresentation: {
    position: `absolute`,
    height: 200,
    width: 100,
    display: "flex",
    flexDirection: `row`,
    alignItems: `center`,
    top: "20%",
    left: "40%",
  },
  textTemperatureReal: {
    flex: 1,
    fontFamily: fonts.kanit_Regular,
    fontSize: 90,
    color: color.bluePrimary,
    /* cuidado com o line Height mau configurado,vai comer sua letra */
  },
  unity: {
    fontFamily: fonts.kanit_Ligth,
    color: color.with,
    fontSize: 18,
    marginLeft: 10,
  },
});
