import equipmentService from '@/app/services/equipment.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export default function useGetEquipmentQuery(searchTerms?: AxiosRequestConfig['params']) {
	return useQuery({
		queryKey: ['equipment', searchTerms],
		queryFn: () => equipmentService.getAll(searchTerms),
		initialData: { data: [], message: null },
		refetchOnMount: true,
		keepPreviousData: true,
		select: (res) => res.data
	});
}
