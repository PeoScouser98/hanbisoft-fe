import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EquipmentService from '@/app/services/api/equipment.service';
import { AxiosRequestConfig } from 'axios';

const QUERY_KEY = 'equipment';
/**
 * Get equipments
 */
export function useGetEquipmentsQuery(searchTerms: AxiosRequestConfig['params']) {
	const [dependencies, setDependencies] = React.useState<AxiosRequestConfig['params']>(searchTerms);

	React.useEffect(() => {
		setDependencies(searchTerms);
	}, [searchTerms]);

	return useInfiniteQuery(
		[QUERY_KEY, dependencies],
		async ({ pageParam = 1 }) => {
			const response = await EquipmentService.getEquipments({ page: pageParam, ...searchTerms });
			return response?.metadata;
		},
		{
			initialData: {
				pages: [],
				pageParams: []
			},
			enabled: true,

			select: ({ pages, pageParams }) => ({
				pages: pages.map((page) => page?.docs),
				pageParams
			}),
			getNextPageParam: (current: any) => {
				if (current?.nextPage) return current?.nextPage;
			}
		}
	);
}
/**
 * Save equipments having data changes
 */
export function useSaveEquipmentsMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [QUERY_KEY],
		mutationFn: EquipmentService.saveEquipmentsChanges,
		onSuccess: () => queryClient.invalidateQueries([QUERY_KEY])
	});
}

/**
 * Get lookup values of each equipment
 */
export function useGetLookupFieldsQuery() {
	const initialData = { sales_cd: [], sale_status: [], prod_type: [], prod_type1: [], prod_type2: [], prod_type3: [] };
	return useQuery<any>({
		queryKey: ['equipment_lookup'],
		queryFn: EquipmentService.getLookupFieldsValue,
		initialData,
		keepPreviousData: true,
		enabled: true,
		select: (res) => res?.metadata || initialData
	});
}

/**
 * Delete equipments query
 */
export function useDeleteEquipmentsMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [QUERY_KEY],
		mutationFn: EquipmentService.deleteEquipments,
		onSuccess: () => queryClient.invalidateQueries([QUERY_KEY])
	});
}
