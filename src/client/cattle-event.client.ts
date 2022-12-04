import { CattleEvent } from "@/model/cattle-event.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";

class CattleEventClient {

    findById(id: number): Promise<any> {
        try {
            return axiosClient.get<CattleEvent>(`/cattleEvent/${id}`)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByEventType(id: number): Promise<any> {
        try {
            return axiosClient.get(`/cattleEvent/eventType/${id}`)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByWeighing(id: number): Promise<any> {
        try {
            return axiosClient.get(`/cattleEvent/weighing/${id}`)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByVaccineApplication(id: number): Promise<any> {
        try {
            return axiosClient.get<CattleEvent>(`/cattleEvent/vacineApp/${id}`)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByCattle(id: number): Promise<any> {
        try {
            return axiosClient.get<CattleEvent>(`/cattleEvent/cattle/${id}`)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findAll(): Promise<any> {
        try {

            let requestPath = '/cattleEvent'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findAllAgrouped(): Promise<any> {
        try {
            let requestPath = '/cattleEvent/agrouped'
            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    save(cattleEvent: CattleEvent): Promise<any> {
        try {
            return axiosClient.post('/cattleEvent/', cattleEvent)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    update(cattleEvent: CattleEvent): Promise<any> {
        try {
            return axiosClient.put(`/cattleEvent/`, cattleEvent)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    disable(id: number): Promise<any> {
        try {
            return axiosClient.get("/cattleEvent/disable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    enable(id: number): Promise<any> {
        try {
            return axiosClient.get("/cattleEvent/enable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}

export default new CattleEventClient();