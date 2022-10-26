import { Farm } from "@/model/farm.model";
import axiosClient from "../plugins/axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class FarmClient {

    public async findById(id: number): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/farm/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByAddress(farm: Farm): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/farm/address/${farm.address}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByName(farm: Farm): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/farm/name/${farm.name}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

  	public async findAll(): Promise<any> {
        try {
            let requestPath = '/farm'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
  	}

	public async save(farm: Farm): Promise<any> {
		try {
			return (await axiosClient.post('/farm/', farm))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async update(farm: Farm): Promise<any> {
		try {
			return (await axiosClient.post(`/farm/${farm.id}`, farm)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async disable(farm: Farm): Promise<any> {
		try {
			return (await axiosClient.post(`/farm/disable/${farm.id}`, farm)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async count() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/farm/count')).data
		}catch{
			return Promise.reject();
		}
	}
}