import { Insemination } from "@/model/insemination.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";

class InseminationClient {
    findById(id: number): Promise<any> {
        try{
            return axiosClient.get<Insemination>(`/inseminations/${id}`)
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findAll(): Promise<any> {
        try {
            let requestPath = '/inseminations'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    save(insemination: Insemination): Promise<any> {
        try {
            return axiosClient.post('/inseminations', insemination)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(insemination: Insemination): Promise<any> {
        try {
            return axiosClient.put('/inseminations', insemination)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(id: number): Promise<any> {
        try {
            return axiosClient.get("/inseminations/disable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async enable(id: number): Promise<any> {
        try {
            return axiosClient.get("/inseminations/enable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async count() : Promise<any>{
        try{
            return axiosClient.get<any>('/inseminations/count')
        }catch{
            return Promise.reject();
        }
    }
}

export default new InseminationClient();