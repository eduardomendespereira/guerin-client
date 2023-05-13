import { Cattle } from "@/model/cattle.model";
import axiosClient from "../plugins/axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class CattleClient {


    public async findById(id: number): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/cattle/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    
    public async findByEarring(earring: number): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/cattle/earring/${earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findByFarm(id: number): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/cattle/farm/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findBySpecie(id: number): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/cattle/specie/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findChildren(earring: number): Promise<any> {
        try {
            return (await axiosClient.get<any>(`/cattle/children/${earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByParents(cattle: Cattle): Promise<Cattle> {
        try {
            return (await axiosClient.get<Cattle>(`/cattle/parents/${cattle.earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

	public async findAll(): Promise<any> {
        try {
            let requestPath = '/cattle'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findAllFemale(): Promise<any> {
        try {
            let requestPath = '/cattle/gender/female'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async save(cattle: Cattle): Promise<void> {
		try {
			return (await axiosClient.post('/cattle', cattle))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async update(cattle: Cattle): Promise<void> {
		try {
			return (await axiosClient.put(`/cattle/${cattle.earring}`, cattle)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async disable(cattle: Cattle): Promise<void> {
		try {
			return (await axiosClient.put(`/cattle/disable/${cattle.earring}`, cattle)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

    public async enable(cattle: Cattle): Promise<void> {
		try {
			return (await axiosClient.put(`/cattle/enable/${cattle.earring}`, cattle)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

    public async count() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/cattle/count')).data
		}catch{
			return Promise.reject();
		}
	}

    public async countMale() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/cattle/count/male')).data
		}catch{
			return Promise.reject();
		}
	}

    public async countFemale() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/cattle/count/female')).data
		}catch{
			return Promise.reject();
		}
	}

    public async canBreed(earring: number) : Promise<any>{
        try{
            return (await axiosClient.get<any>(`/cattle/can-breed/${earring}`)).data
        }catch{
            return Promise.reject();
        }
    }
}