import { Farm } from "@/model/farm.model";
import axiosClient from "../plugins/axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class FarmClient {

    public async findById(farm: Farm): Promise<Farm> {
        try {
            return (await axiosClient.get<Farm>(`/farm/${farm.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByAddress(farm: Farm): Promise<Farm> {
        try {
            return (await axiosClient.get<Farm>(`/farm/address/${farm.address}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByName(farm: Farm): Promise<Farm> {
        try {
            return (await axiosClient.get<Farm>(`/farm/name/${farm.name}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

  	public async findAll(pageRequest : PageRequest): Promise<PageResponse<Farm>> {
		try {
			
			let requestPath = '/farm'
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await axiosClient.get<PageResponse<Farm>>(requestPath, 
				{ 
					params: { filtros: pageRequest.filter } 
				}
			)).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
  	}

	public async save(farm: Farm): Promise<void> {
		try {
			return (await axiosClient.post('/farm/', farm))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async update(farm: Farm): Promise<void> {
		try {
			return (await axiosClient.put(`/farm/${farm.id}`, farm)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async disable(farm: Farm): Promise<void> {
		try {
			return (await axiosClient.put(`/farm/disable/${farm.id}`, farm)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}