import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
import { User } from "@/model/user.model";
import { Weighing } from "@/model/weighing.model";
import { ca } from "element-plus/es/locale";

export class WeighingClient {
  public async findById(id: number): Promise<any> {
    try {
      return (await axiosClient.get<Weighing>(`/weighing/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async findByAll(
    pageRequest: PageRequest
  ): Promise<PageResponse<Weighing>> {
    try {
      let requestPath = "/weighing";

      requestPath += `?page=${pageRequest.currentPage}`;
      requestPath += `&size=${pageRequest.pageSize}`;
      requestPath += `&sort=${
        pageRequest.sortField === undefined ? "" : pageRequest.sortField
      },${pageRequest.direction}`;

      return (
        await axiosClient.get<PageResponse<Weighing>>(requestPath, {
          params: { filtros: pageRequest.filter },
        })
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async save(weighing: any): Promise<void> {
    try {
      weighing.date = new Date(weighing.date).toLocaleString();
      return await axiosClient.post("/weighing", weighing);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async mediaWeight(id : any): Promise<any>{
      try{
        return (await axiosClient.get<Weighing>(`/weighing/media/${id}`)).data;
      } catch(error:any){
        return Promise.reject(error.response);
      }
  }

  public async update(weighing: any): Promise<void> {
    try {
      weighing.date = new Date(weighing.date).toLocaleString();
      return (await axiosClient.put(`/weighing/${weighing.id}`, weighing)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async disable(weighing: Weighing): Promise<void> {
    try {
      return (
        await axiosClient.put(`/weighing/disable/${weighing.id}`, weighing)
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async enable(weighing: Weighing): Promise<void> {
    try {
      return (
        await axiosClient.put(`/weighing/enable/${weighing.id}`, weighing)
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async count(): Promise<any> {
    try {
      return (await axiosClient.get<any>("/weighing/count")).data;
    } catch {
      return Promise.reject();
    }
  }
}
