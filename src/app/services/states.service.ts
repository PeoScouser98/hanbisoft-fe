import { IStates } from '@/core/types/state';
import axiosClient from '../configs/axios.config';

export const getAvailableStates = async (): Promise<IStates[]> => axiosClient.get('/states');
