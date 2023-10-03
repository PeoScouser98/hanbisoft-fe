import { HttpResponse } from '@/types/global';
import axiosInstance from '../configs/axios.config';

export default class AuthService {
	static getRecoverPassword = async ({ email }: { email: string }): Promise<HttpResponse<null>> => {
		try {
			return await axiosInstance.post('/auth/recover-password', { email });
		} catch (error) {
			console.log(error.message);
		}
	};
}
