import axios from "axios";

const api = axios.create({
   baseURL: "http://10.0.202.247:3333",
  //baseURL: "http://10.10.202.247:3333",
  // baseURL: "http://192.168.115:3333",
});

export default api;