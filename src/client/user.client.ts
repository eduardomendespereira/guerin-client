import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { ResultRefreshToken } from "@/model/payload/result-refresh-token.model";
import axiosClient from "../plugins/axios";

export class UserClient {

    public async login(username: string, password: string): Promise<any> {
        try {
            var params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            return (await axiosClient.post('/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async refreshToken(refresh_token: string): Promise<ResultRefreshToken> {
        try {
            return (await axiosClient.post('/refresh-token', {
                headers: {
                    'Authorization': 'Bearer ' + refresh_token,
                }
            }))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}