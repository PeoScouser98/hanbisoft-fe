import EquipmentService from '@/app/services/api/equipment.service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Get equipments
 */
export function useGetEquipmentsQuery(searchTerms) {
	const [dependencies, setDependencies] = React.useState(searchTerms);

	React.useEffect(() => {
		setDependencies(searchTerms);
	}, [searchTerms]);

	return useInfiniteQuery(
		['equipment', dependencies],
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
		mutationKey: ['equipment'],
		mutationFn: EquipmentService.saveEquipmentsChanges,
		onSuccess: () => queryClient.invalidateQueries(['equipment'])
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
		mutationKey: ['equipment'],
		mutationFn: EquipmentService.deleteEquipments,
		onSuccess: () => queryClient.invalidateQueries(['equipment'])
	});
}
