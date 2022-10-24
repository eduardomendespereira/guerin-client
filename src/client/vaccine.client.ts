import { Vaccine } from "@/model/vaccine.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";

export class VaccineClient {

    public async findById(id: number): Promise<any> {
        try{
            return (await axiosClient.get<Vaccine>(`/vaccines/${id}`)).data
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByName(name: string): Promise<Vaccine> {
        try{
            return (await axiosClient.get<Vaccine>(`/vaccines/get-by-name/${name}`)).data
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest : PageRequest): Promise<PageResponse<Vaccine>> {
        try {
            let requestPath = '/vaccines'

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await axiosClient.get<PageResponse<Vaccine>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async save(vaccine: Vaccine): Promise<void> {
        try {
            return (await axiosClient.post('/vaccines', vaccine))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(vaccine: Vaccine): Promise<void> {
        try {
            return (await axiosClient.put('/vaccines', vaccine)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(id: number): Promise<any> {
        try {
            return (await axiosClient.get("/vaccines/disable/" + id)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async enable(id: number): Promise<any> {
        try {
            return (await axiosClient.get("/vaccines/enable/" + id)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async count() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/vaccines/count')).data
		}catch{
			return Promise.reject();
		}
	}
}