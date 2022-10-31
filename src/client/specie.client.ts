import { Specie } from "@/model/specie.model";
import axios, { AxiosInstance } from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axiosClient from "../plugins/axios";
export class SpecieClient {

    public async findById(id: number): Promise<Specie> {
        try {
            return (await axiosClient.get<Specie>(`/species/${id}`)).data
        } catch (error:any) {
            return Promise.reject()
        }
    }
	public async count() : Promise<any>{
		try{
			return (await axiosClient.get<any>('/species/count')).data
		}catch{
			return Promise.reject();
		}
	}
	findAll(): Promise<any> {
		try {
		  let requestPath = "/species";
	
		  return axiosClient.get(requestPath);
		} catch (error: any) {
		  return Promise.reject(error.response);
		}
	}
	public async cadastrar(specie: Specie): Promise<void> {
		try {
			return (await axiosClient.post('/species', specie))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(specie: Specie): Promise<void> {
		try {
			return (await axiosClient.put(`species/${specie.id}`, specie)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(specie: Specie): Promise<void> {
		try {
			return (await axiosClient.put(`/species/disable/${specie.id}`, specie)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}
}