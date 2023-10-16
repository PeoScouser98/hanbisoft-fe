import { HttpResponse } from '@/types/global';
import axiosInstance from '../../configs/axios.config';
import useAsync from '@/common/utils/useAsync';

export default class AuthService {
	static getRecoverPassword = async ({ email }: { email: string }): Promise<HttpResponse<null>> => {
		return await axiosInstance.post('/auth/recover-password', { email });
	};
}
