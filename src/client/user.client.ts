import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { ResultRefreshToken } from "@/model/payload/result-refresh-token.model";
import axiosClient from "../plugins/axios";
import { User } from "@/model/user.model";

class UserClient {
  login(username: string, password: string): Promise<any> {
    try {
      var params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      return axiosClient.post("/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  refreshToken(refresh_token: string): Promise<ResultRefreshToken> {
    try {
      return axiosClient.post("/refresh-token", {
        headers: {
          Authorization: "Bearer " + refresh_token,
        },
      });
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  findAll(): Promise<any> {
    try {
      let requestPath = "/users";

      return axiosClient.get(requestPath);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  findById(id: number): Promise<any> {
    try {
      let requestPath = "/user/" + id;

      return axiosClient.get(requestPath);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  save(user: User): Promise<void> {
    try {
      return axiosClient.post("/user/register", user);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  disable(id: number): Promise<void> {
    try {
      return axiosClient.get("/user/disable/" + id);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  enable(id: number): Promise<void> {
    try {
      return axiosClient.get("/user/enable/" + id);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}

export default new UserClient();
