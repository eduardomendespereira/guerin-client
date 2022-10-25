import { Vaccine } from "@/model/vaccine.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";

class VaccineClient {
    findById(id: number): Promise<any> {
        try{
            return axiosClient.get<Vaccine>(`/vaccines/${id}`)
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByName(name: string): Promise<any> {
        try{
            return axiosClient.get("/vaccines/get-by-name/" + name)
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findAll(): Promise<any> {
        try {
            let requestPath = '/vaccines'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    save(vaccine: Vaccine): Promise<any> {
        try {
            return axiosClient.post('/vaccines', vaccine)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(vaccine: Vaccine): Promise<any> {
        try {
            return axiosClient.put('/vaccines', vaccine)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(id: number): Promise<any> {
        try {
            return axiosClient.get("/vaccines/disable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async enable(id: number): Promise<any> {
        try {
            return axiosClient.get("/vaccines/enable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async count() : Promise<any>{
		try{
			return axiosClient.get<any>('/vaccines/count')
		}catch{
			return Promise.reject();
		}
	}
}

export default new VaccineClient();