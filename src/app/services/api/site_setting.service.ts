import { HttpResponse } from '@/types/global';
import axiosInstance from '../../configs/axios.config';
import useAsync from '@/common/utils/useAsync';

export default class SiteSettingService {
	static updateSiteSettings = async (payload): Promise<HttpResponse<any>> => {
		return await axiosInstance.patch('/site-settings/update', payload);
	};
}
