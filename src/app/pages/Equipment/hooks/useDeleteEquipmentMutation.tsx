import equipmentService from '@/app/services/equipment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteEquipmentsMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['equipment'],
		mutationFn: equipmentService.deleteEquipments,
		onSuccess: () => queryClient.invalidateQueries(['equipment'])
	});
}
