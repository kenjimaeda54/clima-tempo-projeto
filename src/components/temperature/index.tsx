import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { color } from "../../global/color";
import { fonts } from "../../global/fonts";
import { style } from "./style";

export type DataProps = {
  weekDay: string[];
  temperatureHigh: number;
  temperatureLow: number;
  temperatureMiddleCurrent: number[];
};

type TemperatureProps = {
  requestData: DataProps;
  formated: boolean;
};

export const Temperature = ({ requestData, formated }: TemperatureProps) => {
  const contentInset = { top: 20, bottom: 20 };
  const { temperatureHigh, temperatureLow, weekDay, temperatureMiddleCurrent } =
    requestData;
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
        formatLabel={(value) => (formated ? `${value}ºC` : `${value}°F`)}
      />
      <LineChart
        style={{ flex: 1, marginLeft: 16 }}
        data={temperatureMiddleCurrent}
        svg={{ stroke: color.bluePrimary }}
        contentInset={contentInset}
        yMin={temperatureLow}
        yMax={temperatureHigh}
      >
        <XAxis
          data={data}
          formatLabel={(value, index) => weekDay[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 9, fill: "blue", fontFamily: fonts.Kanit_Medium }}
          style={style.axiosX}
        />
        <Grid />
      </LineChart>
    </View>
  );
};
