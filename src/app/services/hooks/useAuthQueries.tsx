import UserRoleService from '@/app/services/api/permission.service';
import { useQuery } from '@tanstack/react-query';

export function useGetUserRolesQuery() {
	return useQuery({
		queryKey: ['permissions'],
		queryFn: UserRoleService.getAllUserRoles,
		initialData: [],
		select: (response) => response.metadata
	});
}
