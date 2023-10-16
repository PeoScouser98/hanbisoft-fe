import { HttpResponse } from '@/types/global';
import axiosInstance from '../../configs/axios.config';
import { IUserRole } from '@/types/entities';

export default class UserRoleService {
	static getAllUserRoles = async (): Promise<HttpResponse<IUserRole[]>> => await axiosInstance.get('/user-roles');
	static upsertUserRole = async (payload) => await axiosInstance.put('/user-roles/upsert', payload);
}
