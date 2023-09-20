import axios from 'axios';

declare module 'axios' {
	interface AxiosInstance {
		getAccessToken: () => string | null;
		setAccessToken: (accessToken: string) => void;
	}
}
