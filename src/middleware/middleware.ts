import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { UserClient } from "@/client/user.client";

export default {
  async auth(to: any, from: any, next: any): Promise<void> {
    var token = getCookie("access_token") ?? "";
    var refresh_token = getCookie("refresh_token") ?? "";

    var decodedToken = token ? jwtDecode<JwtPayload>(token) : null;
    var decodedRfToken = refresh_token
      ? jwtDecode<JwtPayload>(refresh_token)
      : null;

    var tokenExp = decodedToken
      ? new Date((decodedToken.exp ?? 0) * 1000)
      : null;

    var rfTokenExp =
      decodedRfToken != null
        ? new Date((decodedRfToken.exp ?? 0) * 1000)
        : null;
    var calc = 1000 * 60 * 60;
    var dtNow = new Date();

    if (
      (!token && !refresh_token) ||
      (refresh_token && rfTokenExp && rfTokenExp < dtNow)
    ) {
      next("/login");
    } else if (
      (!tokenExp && refresh_token) ||
      (tokenExp != null &&
        tokenExp.getTime() / calc - dtNow.getTime() / calc < 2 &&
        rfTokenExp &&
        rfTokenExp > dtNow)
    ) {
      var userClient = new UserClient();
      var newToken = await userClient.refreshToken(refresh_token);
      removeCookie("access_token");
      removeCookie("refresh_token");
      setCookie("access_token", newToken.access_token, { expires: 1 });
      setCookie("refresh_token", newToken.refresh_token, { expires: 4 });
    }

    next();
  },
};
