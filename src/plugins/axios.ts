import axios from "axios";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import UserClient from "@/client/user.client";
import jwtDecode, { JwtPayload } from "jwt-decode";

var axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

axiosClient.defaults.headers.common["Authorization"] =
  "Bearer " + getCookie("access_token");

axiosClient.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axiosClient.interceptors.request.use(
  async (config) => {
    var token = getCookie("access_token") ?? "";
    var refresh_token = getCookie("refresh_token") ?? "";
    if ((token && refresh_token) || (!token && refresh_token)) {
      var decodedToken = token ? jwtDecode<JwtPayload>(token) : null;
      var decodedRfToken = jwtDecode<JwtPayload>(refresh_token);

      var tokenExp = decodedToken
        ? new Date((decodedToken.exp ?? 0) * 1000)
        : null;
      var rfTokenExp = new Date((decodedRfToken.exp ?? 0) * 1000);

      console.log("Expires: " + rfTokenExp);

      var calc = 1000 * 60 * 60;
      var dtNow = new Date();
      if (
        tokenExp == null ||
        (tokenExp != null &&
          tokenExp.getTime() / calc - dtNow.getTime() / calc < 2 &&
          rfTokenExp > dtNow)
      ) {
        var newToken = await UserClient.refreshToken(refresh_token);
        removeCookie("access_token");
        removeCookie("refresh_token");
        setCookie("access_token", newToken.access_token, { expires: 1 });
        setCookie("refresh_token", newToken.refresh_token, { expires: 4 });
        config.headers = {
          ...config.headers,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          authorization: `Bearer ${newToken.access_token}`,
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
