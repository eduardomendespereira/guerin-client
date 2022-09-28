import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
import {User} from "@/model/user.model";
import { Weighing } from "@/model/weighing.model";

export class WeighingClient {

    public async findById(id: number): Promise<Weighing> {
        try{
            return (await axiosClient.get<Weighing>(`/weighing/${id}`)).data
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest : PageRequest): Promise<PageResponse<Weighing>> {
        try {
            let requestPath = '/weighing'

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await axiosClient.get<PageResponse<Weighing>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async save(weighing: Weighing): Promise<void> {
        try {
            return (await axiosClient.post('/weighing', weighing))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(weighing: Weighing): Promise<void> {
        try {
            return (await axiosClient.put(`/${weighing.id}`, weighing)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(weighing: Weighing): Promise<void> {
        try {
            return (await axiosClient.put(`/weighing/disable/${weighing.id}`, weighing)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}