import { Cattle } from "@/model/cattle.model";
import axiosClient from "../plugins/axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class CattleClient {


    public async findById(cattle: Cattle): Promise<Cattle> {
        try {
            return (await axiosClient.get<Cattle>(`/cattle/${cattle.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    
    public async findByEarring(cattle: Cattle): Promise<Cattle> {
        try {
            return (await axiosClient.get<Cattle>(`/cattle/earring/${cattle.earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findByFarm(cattle: Cattle): Promise<Cattle> {
        try {
            return (await axiosClient.get<Cattle>(`/cattle/farm/${cattle.farm.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findBySpecie(cattle: Cattle): Promise<Cattle> {
        try {
            return (await axiosClient.get<Cattle>(`/cattle/specie/${cattle.specie.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findChildren(cattle: Cattle): Promise<Cattle> {
        try {
            return (await axiosClient.get<Cattle>(`/cattle/children/${cattle.earring}`)).data
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

  	public async findAll(pageRequest : PageRequest): Promise<PageResponse<Cattle>> {
		try {
			
			let requestPath = '/cattle'
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await axiosClient.get<PageResponse<Cattle>>(requestPath, 
				{ 
					params: { filtros: pageRequest.filter } 
				}
			)).data
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
}