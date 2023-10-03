import axios, { HttpStatusCode } from 'axios';
import { signout } from '../store/reducers/auth.reducer';
import __configs from './system.config';

const axiosInstance = axios.create({
	baseURL: __configs.BASE_URL,
	withCredentials: true,
	timeout: 5000 // Cancel request if response time > 5 seconds
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
		if (error.response.status === HttpStatusCode.Unauthorized) {
			retry++;
			console.log('[ERROR] ::: Signin session has expired.');
			const { user } = window.store.getState().auth;
			if (!user) {
				window.store.dispatch(signout());
				return Promise.reject(error);
			}
			console.log('retry :>> ', retry);
			if (retry > 1) {
				controller.abort();
				window.store.dispatch(signout());
				return Promise.reject(error);
			}
			if (retry === 1) {
				await axiosInstance.get('/auth/refresh-token/' + user._id, { signal: controller.signal }).catch((error) => {
					retry++;
					controller.abort();
					return Promise.reject(error);
				});
				return await axiosInstance
					.request({ ...error.config, signal: controller.signal })
					.then((response) => {
						retry--;
						return response;
					})
					.catch((error) => {
						retry++;
						controller.abort();
						return Promise.reject(error);
					});
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
