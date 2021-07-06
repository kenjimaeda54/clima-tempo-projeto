import React from "react";
import { View, Text } from "react-native";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { color } from "../../global/color";
import { fonts } from "../../global/fonts";
import { style } from "./style";

export type DataProps = {
  weekDay: string[];
  temperatureHigh: number;
  temperatureLow: number;
};

type TemperatureProps = {
  requestData: DataProps;
};

export const Temperature = ({ requestData }: TemperatureProps) => {
  const contentInset = { top: 20, bottom: 20 };
  const { temperatureHigh, temperatureLow, weekDay } = requestData;
  const middle = (temperatureHigh + temperatureLow) / 2;
  const data = [temperatureHigh, temperatureLow, middle];

  return (
    <View style={style.viewMain}>
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
        svg={{ stroke: "rgb(134, 65, 244)" }}
        contentInset={contentInset}
        yMin={temperatureLow}
        yMax={temperatureHigh}
      >
        <XAxis
          data={data}
          formatLabel={(value, index) => weekDay[value]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "black" }}
          style={style.axiosX}
        />
        <Grid />
      </LineChart>
    </View>
  );
};
