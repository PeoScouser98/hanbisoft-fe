import { useGetUsersQuery } from '@/app/store/api/userApi';
import Typography from '@/core/components/Typography';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StatsBox = () => {
	const { data } = useGetUsersQuery({});

	return (
		<Card>
			<Typography variant='h3'>Users</Typography>
			<Typography variant='h4'>
				{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
					Array.isArray(data) ? data.length : 0
				)}{' '}
				users
			</Typography>
			<Typography variant='small'>updated at {new Date().toLocaleDateString()}</Typography>

			<Link to='/users' className='dx-theme-text-color' style={{ display: 'inline-block', margin: '16px 0' }}>
				View all
			</Link>
		</Card>
	);
};

const Card = styled.div.attrs({ className: 'dx-card' })`
	border-radius: 8px;
	padding: 16px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 6px;
`;

export default StatsBox;
