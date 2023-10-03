import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../configs/axios.config';
import { type IUser, type HttpResponse } from '@/types/global';
import { DataChange } from 'devextreme/common/grids';

export default class UserService {
	static getUsers = async (params: AxiosRequestConfig['params']): Promise<HttpResponse<IUser[]>> => {
		return await axiosInstance.get('/users', { params: params });
	};
	static updateUsersList = async (payload: DataChange<IUser>[]) => {
		return await axiosInstance.put('/users', payload);
	};
}
