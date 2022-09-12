import { CattleEvent } from "@/model/cattle-event.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";

export class CattleEventClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/cattleEvent',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<CattleEvent> {
        try {
            return (await this.axiosClient.get<CattleEvent>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByEventType(id: number): Promise<CattleEvent> {
        try {
            return (await this.axiosClient.get<CattleEvent>(`/eventType/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByWeighing(id: number): Promise<CattleEvent> {
        try {
            return (await this.axiosClient.get<CattleEvent>(`/weighing/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByVaccineApplication(id: number): Promise<CattleEvent> {
        try {
            return (await this.axiosClient.get<CattleEvent>(`/vacineApp/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByCattle(id: number): Promise<CattleEvent> {
        try {
            return (await this.axiosClient.get<CattleEvent>(`/cattle/${id}`)).data
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

            return (await this.axiosClient.get<PageResponse<CattleEvent>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(cattleEvent: CattleEvent): Promise<void> {
        try {
            return (await this.axiosClient.post('/', cattleEvent))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async editar(cattleEvent: CattleEvent): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${cattleEvent.id}`, cattleEvent)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async desativar(cattleEvent: CattleEvent): Promise<void> {
        try {
            return (await this.axiosClient.put(`/disable/${cattleEvent.id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}