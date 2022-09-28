import { Specie } from "@/model/specie.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
export class SpecieClient {


    public async findById(id: number): Promise<Specie> {
        try {
            return (await axiosClient.get<Specie>(`/${id}`)).data
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
			
			return (await axiosClient.get<PageResponse<Specie>>(requestPath,
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
			return (await axiosClient.post('/', specie))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(specie: Specie): Promise<void> {
		try {
			return (await axiosClient.put(`/${specie.id}`, specie)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(specie: Specie): Promise<void> {
		try {
			return (await axiosClient.put(`/disable/${specie.id}`, specie)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}