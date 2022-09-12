import { VaccineApplication } from "@/model/vaccine-application.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";

export class VaccineApplicationClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/vaccineApplications',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<VaccineApplication> {
        try {
            return (await this.axiosClient.get<VaccineApplication>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByVaccine(id: number): Promise<VaccineApplication> {
        try {
            return (await this.axiosClient.get<VaccineApplication>(`/vaccine/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest : PageRequest): Promise<PageResponse<VaccineApplication>> {
        try {
            let requestPath = ''

            requestPath += `?page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`
            requestPath += `&sort=${pageRequest.sortField === undefined
                ? '' : pageRequest.sortField},${pageRequest.direction}`

            return (await this.axiosClient.get<PageResponse<VaccineApplication>>(requestPath,
                {
                    params: { filtros: pageRequest.filter }
                }
            )).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(vaccineApplication: VaccineApplication): Promise<void> {
        try {
            return (await this.axiosClient.post('/', vaccineApplication))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async editar(vaccineApplication: VaccineApplication): Promise<void> {
        try {
            return (await this.axiosClient.put(`/${vaccineApplication.id}`, vaccineApplication)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async desativar(vaccineApplication: VaccineApplication): Promise<void> {
        try {
            return (await this.axiosClient.put(`/disable/${vaccineApplication.id}`, vaccineApplication)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}