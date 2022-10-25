
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
import {EventType} from "@/model/event-type.model";

export class EventTypeClient {

    public async findById(id: number): Promise<EventType> {
        try {
            return (await axiosClient.get<EventType>(`/event_type/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
	public async count() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/event_type/count')).data
		}catch{
			return Promise.reject();
		}
	}

  	public async findByFiltrosPaginado(pageRequest : PageRequest): Promise<PageResponse<EventType>> {
		try {
			
			let requestPath = '/event_type'
			
			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined 
				? '' : pageRequest.sortField},${pageRequest.direction}`
			
			return (await axiosClient.get<PageResponse<EventType>>(requestPath,
				{ 
					params: { filtros: pageRequest.filter } 
				}
			)).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
  	}

	public async cadastrar(event_type: EventType): Promise<void> {
		try {
			return (await axiosClient.post('/event_type', event_type))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(event_type: EventType): Promise<void> {
		try {
			return (await axiosClient.put(`/${event_type.id}`, event_type)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(event_type: EventType): Promise<void> {
		try {
			return (await axiosClient.put(`event_type/disable/${event_type.id}`, event_type)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}