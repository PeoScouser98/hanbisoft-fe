import useAsync from '@/common/utils/useAsync';
import axiosInstance from '../../configs/axios.config';

export default class UserRoleService {
	static getAllUserRoles = useAsync(async () => await axiosInstance.get('/user-roles'));
}
