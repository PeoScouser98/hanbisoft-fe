import { useGetUsersQuery } from '@/app/store/api/userApi';

export default function UserPage() {
	const { data: users } = useGetUsersQuery({ _limit: 100 });

	return <div>User</div>;
}
