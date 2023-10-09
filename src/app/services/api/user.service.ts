import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../../configs/axios.config';
import { type IUser, type HttpResponse } from '@/types/global';
import { DataChange } from 'devextreme/common/grids';
import useAsync from '@/common/utils/useAsync';

export default class UserService {
	static getUsers = useAsync(async (params: AxiosRequestConfig['params']): Promise<HttpResponse<IUser[]>> => {
		return await axiosInstance.get('/users', { params: params });
	});
	static updateUsersList = useAsync(async (payload: DataChange<IUser>[]) => {
		return await axiosInstance.put('/users', payload);
	});
	static deleteUsers = useAsync(async (params: AxiosRequestConfig['params']) => {
		return await axiosInstance.delete('/users/deactivate', { params });
	});
}
