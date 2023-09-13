import styled from 'styled-components';
import RegisterForm from './RegisterPage';

export default function UserPage() {
	// const { data: users } = useGetUsersQuery({ _limit: 100 });

	return (
		<Container>
			<RegisterForm />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 36px;
`;
