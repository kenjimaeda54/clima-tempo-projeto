import axios from "axios";

export const api = axios.create({
  baseURL: "http://apiadvisor.climatempo.com.br/api/",
});
