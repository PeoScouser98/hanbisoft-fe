import equipmentService from '@/app/services/equipment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useSaveEquipmentsMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['equipment'],
		mutationFn: equipmentService.save,
		onSuccess: () => queryClient.invalidateQueries(['equipment'])
	});
}
