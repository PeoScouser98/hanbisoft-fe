import { AxiosRequestConfig } from 'axios';
import { DataChange } from 'devextreme/ui/data_grid';
import axiosInstance from '../configs/axios.config';
import { HttpResponse, IEquipment } from '@/types/global';

export default class EquipmentService {
	static getAll = async (params?: AxiosRequestConfig['params']): Promise<any> => {
		try {
			return await axiosInstance.get('/equipments', { params });
			// return response.data.docs;
		} catch (error) {
			console.log(error.message);
		}
	};
	static getLookupFieldsValue = async (): Promise<HttpResponse<{ [K in keyof IEquipment]: string[] }>> => {
		try {
			return await axiosInstance.get('/equipments/lookup-values');
		} catch (error) {
			console.log(error.message);
		}
	};
	static saveEquipmentsChanges = async (payload: DataChange<any, any>[]): Promise<HttpResponse<IEquipment[]>> => {
		try {
			return await axiosInstance.put('/equipments/save', payload);
		} catch (error) {
			console.log(error.message);
		}
	};
	static deleteEquipments = async (params?: AxiosRequestConfig['params']): Promise<HttpResponse<IEquipment[]>> => {
		try {
			return await axiosInstance.delete('/equipments/delete', { params: params });
		} catch (error) {
			console.log(error?.message);
		}
	};
}
