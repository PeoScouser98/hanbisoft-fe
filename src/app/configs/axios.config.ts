import axios from 'axios';
import _configs from './env.config';
import { HttpStatusCode } from 'axios';
import { signout } from '../store/reducers/auth.reducer';

const axiosClient = axios.create({
	baseURL: _configs.BASE_URL
});

axiosClient.interceptors.request.use(
	(config) => {
		const jwtEndpointsBlacklist: Array<string> = ['/signin', '/refresh-token'];
		if (jwtEndpointsBlacklist.some((url) => url === config.url)) return config;
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		if (error.response.status === HttpStatusCode.Unauthorized) {
			console.log('[ERROR] ::: Signin session has expired.');
			const authState = window.store.getState().auth;
			if (!authState.user) {
				window.store.dispatch(signout());
				return Promise.reject(error);
			}
			const { data } = await axiosClient.get('/refresh-token/' + authState.user?._id).catch((error) => {
				window.store.dispatch(signout());
				return Promise.reject(error);
			});
			console.info(`[SUCCESS] Refresh access token:>>>`, data);
			axiosClient.setAccessToken(data);
			return await axiosClient.request(error.config).catch((error) => {
				window.store.dispatch(signout());
				return Promise.reject(error);
			});
		}
		return Promise.reject(error);
	}
);

axiosClient.getAccessToken = () => {
	return localStorage.getItem('access_token');
};

axiosClient.setAccessToken = (accessToken) => {
	localStorage.setItem('access_token', accessToken);
};

export default axiosClient;
