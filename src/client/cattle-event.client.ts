import { CattleEvent } from "@/model/cattle-event.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";

export class CattleEventClient {


    public async findById(id: number): Promise<CattleEvent> {
        try {
            return (await axiosClient.get<CattleEvent>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByEventType(id: number): Promise<CattleEvent> {
        try {
            return (await axiosClient.get<CattleEvent>(`/eventType/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByWeighing(id: number): Promise<CattleEvent> {
        try {
            return (await axiosClient.get<CattleEvent>(`/weighing/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByVaccineApplication(id: number): Promise<CattleEvent> {
        try {
            return (await axiosClient.get<CattleEvent>(`/vacineApp/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByCattle(id: number): Promise<CattleEvent> {
        try {
            return (await axiosClient.get<CattleEvent>(`/cattle/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest : PageRequest): Promise<PageResponse<CattleEvent>> {
        try {

            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await axiosClient.get<PageResponse<CattleEvent>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async save(cattleEvent: CattleEvent): Promise<void> {
        try {
            return (await axiosClient.post('/', cattleEvent))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(cattleEvent: CattleEvent): Promise<void> {
        try {
            return (await axiosClient.put(`/${cattleEvent.id}`, cattleEvent)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(cattleEvent: CattleEvent): Promise<void> {
        try {
            return (await axiosClient.put(`/disable/${cattleEvent.id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}