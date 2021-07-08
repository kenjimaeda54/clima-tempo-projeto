import React, { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { View, Text, Alert } from "react-native";
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
  current_observation: ObservationProps;
  location: LocationProps;
};

type ObservationProps = {
  condition: {
    temperature: number;
  };
};

type LocationProps = {
  city: string;
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
  const [grausCelsius, setGrausCelsius] = useState(0);
  const [grausFahrenheit, setGrausFahrenheit] = useState(0);
  const [opacityFahrenheit, setOpacityFahrenheit] = useState(false);
  const [opacityCelsius, setOpacityCelsius] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchRequestCelsius, setFetchRequestCelsius] =
    useState<RequestProps>();
  const [fetchRequestFahrenheit, setFetchRequestFahrenheit] =
    useState<RequestProps>();
  const [mountedCelsius, setMountedCelsius] = useState(false);
  const [mountedFahrenheit, setMountedFahrenheit] = useState(false);
  const [formated, setFormated] = useState(true);
  const [fetchArrayWeek, setFetchArrayWeek] = useState<DataProps>(
    {} as DataProps
  );

  const requestApiCelsius = () => {
    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: params, format: "json", u: "c" },
      headers: {
        "x-rapidapi-key": `${TOKEN}`,
        "x-rapidapi-host": `${HOST}`,
      },
    } as AxiosRequestConfig;
    axios
      .request(options)
      .then((response) => {
        setFetchRequestCelsius(response.data);
        setMountedCelsius(true);
      })
      .catch(() => {
        Alert.alert(
          "Atenção",
          "Nao encontramos a cidade,retorna e tenta novamente,digite apenas o nome da cidade sem o estado",
          [
            {
              text: "Voltar e tentar novamente",
              onPress: () => handleGoBack(),
            },
          ]
        );
      });
  };

  const requestApiFahrenheit = () => {
    const options = {
      method: "GET",
      url: "https://yahoo-weather5.p.rapidapi.com/weather",
      params: { location: params, format: "json", u: "f" },
      headers: {
        "x-rapidapi-key": `${TOKEN}`,
        "x-rapidapi-host": `${HOST}`,
      },
    } as AxiosRequestConfig;
    axios.request(options).then((response) => {
      setFetchRequestFahrenheit(response.data);
      setMountedFahrenheit(true);
    });
  };

  useEffect(() => {
    if (!mountedCelsius && mountedFahrenheit === false) {
      requestApiCelsius();
    }
  }, [fetchRequestCelsius]);

  useEffect(() => {
    const week = () => {
      const dayWeek = (day: number) => {
        const week = {
          1: "Mon",
          2: "Tue",
          3: "Wed",
          4: "Thu",
          5: "Fri",
          6: "Sat",
          7: "Sun",
        } as unknown as string;
        return week[day] || "Nao foi possível localizar a semana";
      };

      const getDay = new Date().getDay();
      const getTomorrow = new Date().getDay() + 1;
      const getAfterTomorrow = new Date().getDay() + 2;
      const weekCurrent = fetchRequestCelsius?.forecasts.filter((weeks) => {
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
        const week = {
          Mon: "Seg",
          Tue: "Ter",
          Wed: "Quar",
          Thu: "Quin",
          Fri: "Sex",
          Sat: "Sab",
          Sun: "Dom",
        } as unknown as string;
        const getFormatedDay = (day: string) => {
          return week[day as any] && week[day as any];
        };
        const dayCurrent = days.day;
        return getFormatedDay(dayCurrent);
      }) as string[];
      const temperatureMiddleCurrent = filterWeekCurrent?.map(
        (temperature, index) => {
          const days = (day: number) => {
            const weeks = {
              0: (temperature.high + temperature.low) / 2,
              1: (temperature.high + temperature.low) / 2,
              2: (temperature.high + temperature.low) / 2,
            } as unknown as number[];

            return weeks[day];
          };
          return days(index);
        }
      ) as number[];
      const temperatureHigh = filterWeekCurrent?.reduce((acc, value) => {
        if (acc > value.high) return acc;
        return value.high;
      }, 0) as number;
      const temperatureLow = filterWeekCurrent?.reduce((acc, value) => {
        if (acc < value.low) return value.low;
        return acc;
      }, 0) as number;

      const temperatureCurrent = fetchRequestCelsius?.current_observation
        .condition.temperature as number;
      setGrausCelsius(temperatureCurrent);

      setFetchArrayWeek({
        temperatureHigh,
        temperatureLow,
        weekDay,
        temperatureMiddleCurrent,
      });
      setLoading(false);
    };
    if (mountedCelsius && mountedFahrenheit === false) {
      week();
    }
  }, [fetchRequestCelsius]);

  useEffect(() => {
    const week = () => {
      const dayWeek = (day: number) => {
        const week = {
          1: "Mon",
          2: "Tue",
          3: "Wed",
          4: "Thu",
          5: "Fri",
          6: "Sat",
          7: "Sun",
        } as unknown as string;
        return week[day] || "Nao foi possível localizar a semana";
      };
      const getDay = new Date().getDay();
      const getTomorrow = new Date().getDay() + 1;
      const getAfterTomorrow = new Date().getDay() + 2;
      const weekCurrent = fetchRequestFahrenheit?.forecasts.filter((weeks) => {
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
      const temperatureMiddleCurrent = filterWeekCurrent?.map(
        (temperature, index) => {
          const days = (day: number) => {
            const weeks = {
              0: (temperature.high + temperature.low) / 2,
              1: (temperature.high + temperature.low) / 2,
              2: (temperature.high + temperature.low) / 2,
            } as unknown as number[];

            return weeks[day];
          };
          return days(index);
        }
      ) as number[];
      const temperatureHigh = filterWeekCurrent?.reduce((acc, value) => {
        if (acc > value.high) return acc;
        return value.high;
      }, 0) as number;
      const temperatureLow = filterWeekCurrent?.reduce((acc, value) => {
        if (acc < value.low) return value.low;
        return acc;
      }, 0) as number;

      const temperatureCurrent = fetchRequestFahrenheit?.current_observation
        .condition.temperature as number;
      setGrausFahrenheit(temperatureCurrent);

      setFetchArrayWeek({
        temperatureHigh,
        temperatureLow,
        weekDay,
        temperatureMiddleCurrent,
      });
      setLoading(false);
    };
    if (mountedFahrenheit) {
      week();
    }
  }, [fetchRequestFahrenheit]);

  const handleCelsius = () => {
    setOpacityFahrenheit(false);
    setOpacityCelsius(true);
    setMountedFahrenheit(false);
    setMountedFahrenheit(false);
    setFormated(true);
    setLoading(true);
    requestApiCelsius();
  };

  const handleFahrenheit = () => {
    setOpacityFahrenheit(true);
    setOpacityCelsius(false);
    setLoading(true);
    setFormated(false);
    setMountedFahrenheit(true);
    requestApiFahrenheit();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <View style={style.container}>
          <View>
            <Header handleNavigation={handleGoBack} />
            <View style={style.viewPresentation}>
              <Text style={style.textTemperatureReal}>
                <CountUp
                  end={opacityCelsius ? grausCelsius : grausFahrenheit}
                  isCounting
                  duration={3.7}
                  easing="linear"
                />
              </Text>
              <BorderlessButton onPress={handleFahrenheit}>
                <Text
                  style={[
                    style.unity,
                    opacityFahrenheit ? { opacity: 1 } : { opacity: 0.3 },
                  ]}
                >
                  °f
                </Text>
              </BorderlessButton>
              <BorderlessButton onPress={handleCelsius}>
                <Text
                  style={[
                    style.unity,
                    opacityCelsius ? { opacity: 1 } : { opacity: 0.3 },
                  ]}
                >
                  °c
                </Text>
              </BorderlessButton>
            </View>
            <View style={style.iconHeader}>
              <IconCloud name="cloud-moon-rain" />
              <Text style={style.textCity}>
                {fetchRequestFahrenheit?.location.city ||
                  fetchRequestCelsius?.location.city}
              </Text>
            </View>
            <Temperature formated={formated} requestData={fetchArrayWeek} />
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
