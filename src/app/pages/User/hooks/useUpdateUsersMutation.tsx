import UserService from '@/app/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateUserMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: UserService.updateUsersList,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
	});
}
