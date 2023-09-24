import { AxiosRequestConfig } from 'axios';
import { DataChange } from 'devextreme/ui/data_grid';
import axiosInstance from '../configs/axios.config';

export default {
	getAll: async (params?: AxiosRequestConfig['params']): Promise<HttpResponse<IEquipment[]>> => {
		try {
			return await axiosInstance.get('/equipments' + params);
		} catch (error) {
			console.log(error.message);
		}
	},
	getLookupFieldsValue: async (): Promise<HttpResponse<{ [key: string]: string[] }>> => {
		try {
			return await axiosInstance.get('/equipments/lookup-values');
		} catch (error) {
			console.log(error.message);
		}
	},
	save: async (payload: DataChange<any, any>[]): Promise<HttpResponse<IEquipment[]>> => {
		try {
			return await axiosInstance.put('/equipments/save', payload);
		} catch (error) {
			console.log(error.message);
		}
	},
	delete: async (params?: AxiosRequestConfig['params']): Promise<HttpResponse<IEquipment[]>> => {
		try {
			return await axiosInstance.delete('/equipments/delete', { params: params });
		} catch (error) {
			console.log(error?.message);
		}
	},
	search: async (searchTermsObj): Promise<HttpResponse<IEquipment[]>> => {
		try {
			return await axiosInstance.post('/equipments/search', searchTermsObj);
		} catch (error) {
			console.log(error.message);
		}
	}
};
