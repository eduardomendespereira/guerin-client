import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";
import { ResultLogin } from "@/model/payload/result-login.model";


export class UserClient {
    private axiosClient: AxiosInstance;

    constructor() {        
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api',
            headers: {'Content-Type' : 'application/json'}
        });
    }
    public async login(username: string, password: string): Promise<ResultLogin> {
        try {
            var params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            return (await this.axiosClient.post('/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}