import UserService from '@/app/services/user.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export default function useGetUsersQuery(searchTerms: AxiosRequestConfig['params']) {
	return useQuery({
		queryKey: ['users', searchTerms],
		queryFn: () => UserService.getUsers(searchTerms),
		select: (response) => response.metadata
	});
}
