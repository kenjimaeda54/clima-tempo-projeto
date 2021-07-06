import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { style } from "./style";
import { IconCloud } from "../../components/icon-cloud";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataProps, Temperature } from "../../components/temperature";
import { CountUp } from "use-count-up";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Loader } from "../../components/loader";

type ParamsProps = {
  params: string;
};

const { TOKEN } = process.env;
const { HOST } = process.env;
/* dica variável ambiente de desenvolvimento precisa ser maiúsculo a constante  */
/* dica, precisa converter variável ambiente para string,maneira mais simples e usar template
string `${variável de ambiente} ` */
type RequestProps = {
  forecasts: ForecastsProps;
};

type ForecastsProps = {
  day: string;
  date: number;
  low: number;
  high: number;
  text: string;
}[];

export const FilterCity = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { params } = route.params as ParamsProps;
  const [grausCelsius, setGrausCelsius] = useState(20);
  const [grausFahrenheit, setGrausFahrenheit] = useState(0);
  const [opacityFahrenheit, setOpacityFahrenheit] = useState(false);
  const [opacityCelsius, setOpacityCelsius] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchRequest, setFetchRequest] = useState<RequestProps>();
  const [mounted, setMounted] = useState(false);
  const [fetchArrayWeek, setFetchArrayWeek] = useState<DataProps>(
    {} as DataProps
  );

  const requestApi = () => {
    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: "sao paulo", format: "json", u: "c" },
      headers: {
        "x-rapidapi-key": `${TOKEN}`,
        "x-rapidapi-host": `${HOST}`,
      },
    } as AxiosRequestConfig;
    axios
      .request(options)
      .then((response) => {
        setFetchRequest(response.data);
        setMounted(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (!mounted) {
      requestApi();
    }
  }, [fetchRequest]);

  useEffect(() => {
    const week = () => {
      const dayWeek = (day: any) => {
        const week: any = {
          1: "Mon",
          2: "Tue",
          3: "Wed",
          4: "Thu",
          5: "Fri",
          6: "Sat",
          7: "Sun",
        };
        return week[day] || "Nao foi possível localizar a semana";
      };
      const getDay = new Date().getDay();
      const getTomorrow = new Date().getDay() + 1;
      const getAfterTomorrow = new Date().getDay() + 2;
      const weekCurrent = fetchRequest?.forecasts.filter((weeks) => {
        if (
          [
            dayWeek(getDay),
            dayWeek(getTomorrow),
            dayWeek(getAfterTomorrow),
          ].includes(weeks.day)
        ) {
          return weeks;
        }
      });
      const filterWeekCurrent = weekCurrent?.slice(0, 3);
      /*com slice eu retorno os itens dos indices quero pegar
      exemplo aqui quero pegar do inicio ate o indicie 3    */
      const weekDay = filterWeekCurrent?.map((days) => {
        return days.day;
      }) as string[];
      const temperatureHigh = filterWeekCurrent?.reduce((acc, value) => {
        if (acc > value.high) return acc;
        return value.high;
      }, 0) as number;
      const temperatureLow = filterWeekCurrent?.reduce((acc, value) => {
        if (acc < value.low) return value.low;
        return acc;
      }, 0) as number;

      setFetchArrayWeek({
        temperatureHigh,
        temperatureLow,
        weekDay,
      });
      setLoading(false);
    };
    if (mounted) {
      week();
    }
  }, [fetchRequest]);

  const handleCelsius = () => {
    setOpacityFahrenheit(false);
    setOpacityCelsius(true);
  };

  const handleFahrenheit = () => {
    setOpacityCelsius(false);
    setOpacityFahrenheit(true);
    const Fahrenheit = grausCelsius * (1.8 + 32);
    setGrausFahrenheit(Fahrenheit);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <View style={style.container}>
          <View>
            <Header handleNavigation={() => console.log("oi")} />
            <View style={style.viewPresentation}>
              <Text style={style.textTemperatureReal}>
                <CountUp
                  end={opacityCelsius ? grausCelsius : grausFahrenheit}
                  isCounting
                />
              </Text>
              <BorderlessButton onPress={handleFahrenheit}>
                <Text
                  style={[
                    style.unity,
                    opacityFahrenheit ? { opacity: 1 } : { opacity: 0.5 },
                  ]}
                >
                  °f
                </Text>
              </BorderlessButton>
              <BorderlessButton onPress={handleCelsius}>
                <Text
                  style={[
                    style.unity,
                    opacityCelsius ? { opacity: 1 } : { opacity: 0.5 },
                  ]}
                >
                  °c
                </Text>
              </BorderlessButton>
            </View>
            <View style={style.iconHeader}>
              <IconCloud name="cloud-moon-rain" />
            </View>
            <Temperature requestData={fetchArrayWeek} />
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
