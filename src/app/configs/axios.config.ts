import axios from 'axios';
import store from '../store/store';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL
});

axiosClient.interceptors.request.use(
	(config) => {
		// const accessToken = store.getState().auth;
		// if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error)
);

export default axiosClient;
