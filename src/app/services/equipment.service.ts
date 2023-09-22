import { AxiosRequestConfig } from 'axios';
import { DataChange } from 'devextreme/ui/data_grid';
import axiosInstance from '../configs/axios.config';

export default {
	getAll: async (params?: AxiosRequestConfig['params']): Promise<HttpResponse<IEquipment[]>> => {
		return await axiosInstance.get('/equipments', {
			params
		});
	},
	save: async (payload: DataChange<any, any>[]): Promise<HttpResponse<IEquipment[]>> => {
		return await axiosInstance.put('/equipments/save', payload);
	},
	delete: async (payload: Array<string>): Promise<HttpResponse<IEquipment[]>> => {
		console.log(payload);
		return await axiosInstance.delete('/equipments/delete', { params: { _ids: JSON.stringify(payload) } });
	},
	search: async (searchTermsObj): Promise<HttpResponse<IEquipment[]>> => {
		return await axiosInstance.post('/equipments/search', searchTermsObj);
	}
};
