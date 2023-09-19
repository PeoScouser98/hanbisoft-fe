import axiosClient from '../configs/axios.config';

export const getAvailableStates = async (): Promise<any[]> => axiosClient.get('/states');
