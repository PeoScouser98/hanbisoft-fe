import axios, { AxiosError, HttpStatusCode } from 'axios';
import { signout } from '../store/reducers/auth.reducer';
import __configs from './ecosystem.config';

const axiosInstance = axios.create({
	baseURL: __configs.BASE_URL
});

axiosInstance.interceptors.request.use(
	(config) => {
		const nonJwtEndpoints: Array<string> = ['/signin', '/refresh-token'];
		if (nonJwtEndpoints.some((url) => url === config.url)) return config;
		const accessToken = axiosInstance.getAccessToken();
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response.data,
	async (error: AxiosError) => {
		const controller = new AbortController();
		try {
			if (error.response.status === HttpStatusCode.Unauthorized) {
				console.log('[ERROR] ::: Signin session has expired.');
				const authState = window.store.getState().auth;
				if (!authState.user) {
					window.store.dispatch(signout());
					return Promise.reject(error);
				}
				const { data } = await axiosInstance.get('/auth/refresh-token/' + authState.user._id, {
					signal: controller.signal
				});
				console.log('[SUCCESS] ::: Refresh token :>> ', data);
				axiosInstance.setAccessToken(data);
				await axiosInstance.request({ ...error.config, signal: controller.signal });
			}
		} catch (error) {
			controller.abort();
			window.store.dispatch(signout());
			return Promise.reject(error);
		}
	}
);

axiosInstance.setAccessToken = (accessToken) => localStorage.setItem('access_token', accessToken);
axiosInstance.getAccessToken = () => localStorage.getItem('access_token');
axiosInstance.clearToken = () => localStorage.removeItem('access_token');

export default axiosInstance;
