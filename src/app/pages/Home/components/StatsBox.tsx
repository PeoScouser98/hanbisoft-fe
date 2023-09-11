import Typography from '@/core/components/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StatsBox = () => {
	return (
		<Card>
			<Typography variant='h2'>Users</Typography>
			<Typography variant='h4'>
				{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(Math.floor(Math.random() * 10000))}{' '}
				users
			</Typography>
			<Typography variant='p'>on {new Date().toLocaleDateString()}</Typography>

			<StyledLink to='/'>View all</StyledLink>
		</Card>
	);
};

const Card = styled.div.attrs({ className: 'dx-theme-background-color dx-theme-text-color dx-card' })`
	flex-basis: 30%;
	border-radius: 8px;
	padding: 16px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	gap: 6px;
`;

const StyledLink = styled(Link).attrs({ className: 'dx-theme-accent-color-as-text-color' })``;

export default StatsBox;
