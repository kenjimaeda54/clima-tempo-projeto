import { Header } from "../../components/header";
import React from "react";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { style } from "./style";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { IconCloud } from "../../components/icon-cloud";
import { fonts } from "../../global/fonts";
import { color } from "../../global/color";

export const FilterCity = () => {
  const data = [-3, 0, 13];
  const day = ["segunda", "terça", "quarta"];

  const contentInset = { top: 20, bottom: 20 };
  return (
    <View style={style.container}>
      <View>
        <Header />
        <View style={style.viewPresentation}>
          <Text style={style.textTemperatureReal}>5 </Text>
          <BorderlessButton>
            <Text style={[style.unity, { opacity: 0.3 }]}> °f </Text>
          </BorderlessButton>
          <BorderlessButton>
            <Text style={[style.unity]}> °c</Text>
          </BorderlessButton>
        </View>
        <View style={style.iconHeader}>
          <IconCloud name="cloud-moon-rain" />
        </View>
        <View style={style.viewMain}>
          <Text style={style.textMain}>Previsão para os próximos 3 dias</Text>
          <View style={{ height: 200, flexDirection: "row" }}>
            <YAxis
              data={data}
              contentInset={contentInset}
              svg={{
                fill: "grey",
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={(value) => `${value}ºC`}
            />
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={data}
              svg={{ stroke: color.blueSecondary }}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <XAxis
                data={data}
                svg={{
                  fill: color.textRed,
                  fontFamily: fonts.kanit_Ligth,
                  fontSize: 10,
                }}
                formatLabel={(value) => day[value]}
                contentInset={{ left: 30, right: 30 }}
                xAccessor={(item) => item.index}
              />
              <Grid />
            </LineChart>
          </View>
        </View>
      </View>
    </View>
  );
};
