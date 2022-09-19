import { Vaccine } from "@/model/vaccine.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";

export class VaccineClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/vaccines',
            headers: {'Content-Type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<Vaccine> {
        try{
            return (await this.axiosClient.get<Vaccine>(`/${id}`)).data
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByName(name: string): Promise<Vaccine> {
        try{
            return (await this.axiosClient.get<Vaccine>(`/get-by-name/${name}`)).data
        }catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAll(pageRequest : PageRequest): Promise<PageResponse<Vaccine>> {
        try {
            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<Vaccine>>(requestPath,
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
            return (await this.axiosClient.post('/', vaccine))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async update(vaccine: Vaccine): Promise<void> {
        try {
            return (await this.axiosClient.put('/', vaccine)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async disable(vaccine: Vaccine): Promise<void> {
        try {
            return (await this.axiosClient.put(`/disable/${vaccine.id}`, vaccine)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}