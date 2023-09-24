import equipmentService from '@/app/services/equipment.service';
import { useQuery } from '@tanstack/react-query';

const initialData = { sales_cd: [], sale_status: [], prod_type: [], prod_type1: [], prod_type2: [], prod_type3: [] };

export default function useGetLookupFieldsQuery() {
	return useQuery<any>({
		queryKey: ['equipment_lookup'],
		queryFn: equipmentService.getLookupFieldsValue,
		initialData,
		keepPreviousData: true,
		enabled: false,

		select: (res) => res?.data || initialData
	});
}
