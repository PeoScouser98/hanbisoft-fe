import equipmentService from '@/app/services/equipment.service';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useGetEquipmentQuery(searchTerms) {
	return useInfiniteQuery(
		['equipment', { ...searchTerms }],
		async ({ pageParam = 1 }) => {
			const response = await equipmentService.getAll({ page: pageParam, ...searchTerms });
			return response.metadata;
		},
		{
			initialData: {
				pages: [],
				pageParams: []
			},
			enabled: true,
			cacheTime: 60 * 1000 * 5,
			staleTime: 60 * 1000 * 4,
			select: ({ pages, pageParams }) => ({
				pages: pages.map((page) => page.docs),
				pageParams
			}),
			getNextPageParam: (current: any) => {
				return current?.nextPage;
			}
		}
	);
}
