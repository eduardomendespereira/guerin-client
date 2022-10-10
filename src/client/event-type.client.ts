import { Vaccine } from "@/model/vaccine.model";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
import {EventType} from "@/model/event-type.model";

export class EventTypeClient {

    public async findByAll(pageRequest : PageRequest): Promise<PageResponse<EventType>> {
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
}