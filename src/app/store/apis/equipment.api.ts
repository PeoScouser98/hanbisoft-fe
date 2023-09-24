import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../helper';
import { AxiosRequestConfig } from 'axios';

const equipmentApi = createApi({
	reducerPath: 'equipments',
	tagTypes: ['Equipments'],
	refetchOnMountOrArgChange: true,
	refetchOnReconnect: true,
	// keepUnusedDataFor: 60,
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		getEquipments: build.query<IEquipment[], AxiosRequestConfig['params']>({
			query: (params) => ({ url: '/equipments', method: 'GET', params }),
			transformResponse: (response: HttpResponse<IEquipment[]>): HttpResponse<IEquipment[]>['data'] => {
				return response.data;
			},
			providesTags: [{ type: 'Equipments', id: 'LIST' }]
		}),
		saveEquipmentsChanges: build.mutation<HttpResponse<any>, Array<{ data: IEquipment; type: string }>>({
			query: (data) => ({ url: '/equipments/save', method: 'POST', data }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Equipments', id: 'LIST' }])
		}),
		deleteEquipments: build.mutation<HttpResponse<any>, AxiosRequestConfig['params']>({
			query: (params) => ({ url: '/equipments/save', method: 'POST', params }),
			invalidatesTags: (_, error) => (error ? [] : [{ type: 'Equipments', id: 'LIST' }])
		})
	})
});

export const { useGetEquipmentsQuery, useDeleteEquipmentsMutation, useSaveEquipmentsChangesMutation } = equipmentApi;
export default equipmentApi;
