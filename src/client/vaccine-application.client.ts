import { VaccineApplication } from "@/model/vaccine-application.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
export class VaccineApplicationClient {


    public async findById(id: number): Promise<VaccineApplication> {
        try {
            return (await axiosClient.get<VaccineApplication>(`/vaccineApplications/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByVaccine(id: number): Promise<VaccineApplication> {
        try {
            return (await axiosClient.get<VaccineApplication>(`vaccineApplications/vaccine/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest : PageRequest): Promise<PageResponse<VaccineApplication>> {
        try {
            let requestPath = '/vaccineApplications'

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await axiosClient.get<PageResponse<VaccineApplication>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async save(vaccineApplication: VaccineApplication): Promise<void> {
        try {
            return (await axiosClient.post('/vaccineApplications/', vaccineApplication))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(vaccineApplication: VaccineApplication): Promise<void> {
        try {
            return (await axiosClient.put(`/vaccineApplications/${vaccineApplication.id}`, vaccineApplication)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(vaccineApplication: VaccineApplication): Promise<void> {
        try {
            return (await axiosClient.put(`/vaccineApplications/disable/${vaccineApplication.id}`, vaccineApplication)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async count() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/vaccineApplications/count')).data
		}catch{
			return Promise.reject();
		}
	}
}