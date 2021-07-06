import axios from "axios";

export const api = axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com/forecast",
});
