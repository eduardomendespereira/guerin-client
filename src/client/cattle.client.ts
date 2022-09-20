import { Cattle } from "@/model/cattle.model";
import axios, { AxiosInstance } from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class ConvenioClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/cattle',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(cattle: Cattle): Promise<Cattle> {
        try {
            return (await this.axiosClient.get<Cattle>(`/${cattle.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    
    public async findByEarring(cattle: Cattle): Promise<Cattle> {
        try {
            return (await this.axiosClient.get<Cattle>(`/earring/${cattle.earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findByFarm(cattle: Cattle): Promise<Cattle> {
        try {
            return (await this.axiosClient.get<Cattle>(`/farm/${cattle.farm.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findBySpecie(cattle: Cattle): Promise<Cattle> {
        try {
            return (await this.axiosClient.get<Cattle>(`/specie/${cattle.specie.id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
    
    public async findChildren(cattle: Cattle): Promise<Cattle> {
        try {
            return (await this.axiosClient.get<Cattle>(`/children/${cattle.earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

    public async findByParents(cattle: Cattle): Promise<Cattle> {
        try {
            return (await this.axiosClient.get<Cattle>(`/parents/${cattle.earring}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

  	public async findAll(pageRequest : PageRequest): Promise<PageResponse<Cattle>> {
		try {
			
			let requestPath = ''
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await this.axiosClient.get<PageResponse<Cattle>>(requestPath, 
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
			return (await this.axiosClient.post('/', cattle))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async update(cattle: Cattle): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${cattle.earring}`, cattle)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async disable(cattle: Cattle): Promise<void> {
		try {
			return (await this.axiosClient.put(`/disable/${cattle.earring}`, cattle)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}