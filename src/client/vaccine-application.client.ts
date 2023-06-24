import { VaccineApplication } from "@/model/vaccine-application.model"
import axiosClient from "../plugins/axios";

class VaccineApplicationClient {

    findById(id: number): Promise<any> {
        try {
            return axiosClient.get(`/vaccineApplications/${id}`);
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByVaccine(id: number): Promise<any> {
        try {
            return axiosClient.get(`vaccineApplications/vaccine/${id}`)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    findByAll(): Promise<any> {
        try {
            let requestPath = '/vaccineApplications'

            return axiosClient.get(requestPath)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    save(vaccineApplication: VaccineApplication): Promise<any> {
        try {
            return axiosClient.post('/vaccineApplications/', vaccineApplication)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    update(vaccineApplication: VaccineApplication): Promise<any> {
        try {
            return axiosClient.put(`/vaccineApplications/${vaccineApplication.id}`, vaccineApplication)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    disable(id: number): Promise<any> {
        try {
            return axiosClient.put("/vaccineApplications/disable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    enable(id: number): Promise<any> {
        try {
            return axiosClient.put("/vaccineApplications/enable/" + id)
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    count() : Promise<any>{
		try{
			return axiosClient.get<any>('/vaccineApplications/count')
		}catch{
			return Promise.reject();
		}
	}
}

export default new VaccineApplicationClient();