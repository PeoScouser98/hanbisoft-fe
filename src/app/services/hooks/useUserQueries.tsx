import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import UserService from '@/app/services/api/user.service';

/**
 * Get all users
 */
export function useGetUsersQuery(searchTerms: AxiosRequestConfig['params']) {
	const [dependencies, setDependencies] = React.useState(searchTerms);

	React.useEffect(() => {
		setDependencies(dependencies);
	}, [searchTerms]);

	return useQuery({
		queryKey: ['users', dependencies],
		initialData: [],
		queryFn: () => UserService.getUsers(searchTerms),
		select: (response) => response.metadata
	});
}

/**
 * Add or update users
 */
export function useUpdateUserMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: UserService.updateUsersList,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
	});
}

/**
 * Deactivate users
 */
export function useDeleteUsersMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: UserService.deleteUsers,
		onSuccess: () => queryClient.invalidateQueries(['users'])
	});
}
