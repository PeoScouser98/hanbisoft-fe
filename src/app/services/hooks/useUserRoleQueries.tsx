import UserRoleService from '@/app/services/api/user_role.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEY = 'user_roles';

export function useGetUserRolesQuery() {
	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: UserRoleService.getAllUserRoles,
		// initialData: [],
		select: (response) =>
			response.metadata.map((role) => {
				const { role_name, ...rest } = role;
				return { ...rest, role_name: role_name.capitalize() };
			})
	});
}

export function useUpsertUserRoleQuery() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [QUERY_KEY],
		mutationFn: UserRoleService.upsertUserRole,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
	});
}
