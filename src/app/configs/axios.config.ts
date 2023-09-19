import axios from 'axios';
import _configs from './env.config';

const axiosClient = axios.create({
	baseURL: _configs.BASE_URL
});

axiosClient.interceptors.request.use(
	(config) => {
		const skipingJwtEndpoints = ['/signin'];
		if (skipingJwtEndpoints.indexOf(config.url) !== -1) return config;
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error)
);

export default axiosClient;
