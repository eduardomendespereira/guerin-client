import axios, {AxiosInstance} from 'axios';
import {User} from "@/model/user.model";

export class getToken{
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085',
            headers: {'Content-Type' : 'application/json'}
        });
    }

    public async getToken(token: string, user: User): Promise<any>{
        try{
            return (await this.axiosClient.post('/api/login', user))
        }catch (error:any){
            Promise.reject(error.response);
        }
    }

}