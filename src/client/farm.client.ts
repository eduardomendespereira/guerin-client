import { Farm } from "@/model/farm.model";
import axios, { AxiosInstance } from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class FarmClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/farm',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(farm: Farm): Promise<Farm> {
        try {
            return (await this.axiosClient.get<Farm>(`/${farm.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByAddress(farm: Farm): Promise<Farm> {
        try {
            return (await this.axiosClient.get<Farm>(`/address/${farm.address}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByName(farm: Farm): Promise<Farm> {
        try {
            return (await this.axiosClient.get<Farm>(`/name/${farm.name}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

  	public async findAll(pageRequest : PageRequest): Promise<PageResponse<Farm>> {
		try {
			
			let requestPath = ''
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await this.axiosClient.get<PageResponse<Farm>>(requestPath, 
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
			return (await this.axiosClient.post('/', farm))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async update(farm: Farm): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${farm.id}`, farm)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async disable(farm: Farm): Promise<void> {
		try {
			return (await this.axiosClient.put(`/disable/${farm.id}`, farm)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}