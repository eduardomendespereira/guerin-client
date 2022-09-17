import { Specie } from "@/model/specie.model";
import axios, { AxiosInstance } from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
export class SpecieClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/species',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<Specie> {
        try {
            return (await this.axiosClient.get<Specie>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }

  	public async findByFiltrosPaginado(pageRequest : PageRequest): Promise<PageResponse<Specie>> {
		try {
			
			let requestPath = ''
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await this.axiosClient.get<PageResponse<Specie>>(requestPath, 
				{ 
					params: { filtros: pageRequest.filter } 
				}
			)).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
  	}

	public async cadastrar(specie: Specie): Promise<void> {
		try {
			return (await this.axiosClient.post('/', specie))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(specie: Specie): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${specie.id}`, specie)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(specie: Specie): Promise<void> {
		try {
			return (await this.axiosClient.put(`/disable/${specie.id}`, specie)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}