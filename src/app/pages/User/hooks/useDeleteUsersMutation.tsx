import UserService from '@/app/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteUsersMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: UserService.deleteUsers,
		onSuccess: () => queryClient.invalidateQueries(['users'])
	});
}
