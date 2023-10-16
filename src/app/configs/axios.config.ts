import axios, { HttpStatusCode } from 'axios';
import { signout } from '../store/reducers/auth.reducer';
import __configs from './app.config';
import qs from 'qs';

const axiosInstance = axios.create({
	baseURL: __configs.BASE_URL,
	withCredentials: true,
	paramsSerializer: (params) => qs.stringify(params),
	timeout: 10000 // Cancel request if response time > 5 seconds
});

let retry = 0;
const controller = new AbortController();

axiosInstance.interceptors.request.use(
	(config) => config,
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		if (error.response?.status === HttpStatusCode.Unauthorized) {
			retry++;
			console.log('[ERROR] ::: Signin session has expired.');
			const { user } = window.store.getState().auth;
			if (!user) {
				window.store.dispatch(signout());
				return Promise.reject(error);
			}
			if (retry > 1) {
				controller.abort();
				window.store.dispatch(signout());
				return Promise.reject(new Error('Failed to get refresh token'));
			}
			if (retry === 1) {
				await axiosInstance.get('/auth/refresh-token/' + user._id, { signal: controller.signal }).catch(() => {
					retry++;
					controller.abort();
					return Promise.reject(new Error('Failed to get refresh token'));
				});
				return await axiosInstance
					.request({ ...error.config, signal: controller.signal })
					.then((response) => {
						retry--;
						return response;
					})
					.catch(() => {
						retry++;
						controller.abort();
						return Promise.reject(new Error('Failed to retry previous request'));
					});
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
