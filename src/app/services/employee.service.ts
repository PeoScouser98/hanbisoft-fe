import axiosClient from '../configs/axios.config';

export const getEmployees = async (): Promise<IEmployee[]> => axiosClient.get('/employees');
export const addMultiEmployees = async (data: Array<Partial<IEmployee>>): Promise<IEmployee[]> =>
	axiosClient.post('/employees', data);
export const updateMultiEmployees = async (data: Array<Partial<IEmployee>>) =>
	Promise.all(data.map((item) => axiosClient.patch('/employees/' + item.id, item)));
