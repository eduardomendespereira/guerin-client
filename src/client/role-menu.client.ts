import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Role } from "@/model/role.enum";
import axiosClient from "../plugins/axios";

export class RoleMenuClient {

    public async getMenusByRole(): Promise<any> {
        try {
            return (await axiosClient.get('/rolemenu/role'))
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}