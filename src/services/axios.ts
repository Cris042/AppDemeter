import axios from "axios";

const api = axios.create({
   baseURL: "http://10.0.0.108:3333",
   //baseURL: "http://15.228.248.199:3333",
});

export default api;