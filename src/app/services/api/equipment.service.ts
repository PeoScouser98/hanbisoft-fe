import { AxiosRequestConfig } from 'axios';
import { DataChange } from 'devextreme/ui/data_grid';
import axiosInstance from '../../configs/axios.config';
import { HttpResponse } from '@/types/global';
import useAsync from '@/common/utils/useAsync';
import { IEquipment } from '@/types/entities';

export default class EquipmentService {
	/**
	 * Get equipments
	 */
	static getEquipments = async (params?: AxiosRequestConfig['params']): Promise<any> => {
		const queryParams = Object.keys(params).reduce((prev, curr) => {
			if (!params[curr]) return prev;
			return { ...prev, [curr]: params[curr] };
		}, {});
		return await axiosInstance.get('/equipments', { params: queryParams });
	};

	/**
	 * Get lookup fields of specific equipments's columns
	 */
	static getLookupFieldsValue = async (): Promise<HttpResponse<{ [K in keyof IEquipment]: string[] }>> => {
		return await axiosInstance.get('/equipments/lookup-values');
	};

	/**
	 * Save equipments having data changes
	 */
	static saveEquipmentsChanges = async (payload: DataChange<any, any>[]): Promise<HttpResponse<IEquipment[]>> => {
		return await axiosInstance.put('/equipments/save', payload);
	};

	/**
	 * Delete selected equipments
	 */
	static deleteEquipments = async (params?: AxiosRequestConfig['params']): Promise<HttpResponse<IEquipment[]>> => {
		return await axiosInstance.delete('/equipments/delete', { params: params });
	};
}
