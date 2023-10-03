import React from 'react';
import navigation from '@/app/configs/navigation.config';

import Typography from '@/common/components/Typography';
import styled from '@emotion/styled';
import { TaskAltOutlined } from '@mui/icons-material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import SwipeRightOutlinedIcon from '@mui/icons-material/SwipeRightOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useTranslation } from 'react-i18next';
import useGetUsersQuery from '../User/hooks/useGetUserQuery';

const Home: React.FunctionComponent = () => {
	const { data } = useGetUsersQuery({});
	const { t, i18n } = useTranslation('home');

	const resource = React.useMemo<
		Array<{
			title: string | number;
			icon: any;
			description: string;
		}>
	>(
		() => [
			{
				description: t('number_of_users'),
				icon: Groups2OutlinedIcon,
				title: data?.length || 0
			},
			{
				description: t('number_of_systems'),
				icon: DnsOutlinedIcon,
				title: 1
			},
			{
				description: t('number_of_menus'),
				icon: MenuOutlinedIcon,
				title: navigation.filter((item) => !!item.path).length
			},
			{
				description: t('task'),
				icon: TaskAltOutlined,
				title: 0
			},
			{
				description: t('completed'),
				icon: CheckOutlinedIcon,
				title: 0
			},
			{
				description: t('in_progress'),
				icon: HourglassTopOutlinedIcon,
				title: 0
			},
			{
				description: t('rejected'),
				icon: BlockOutlinedIcon,
				title: 0
			},
			{
				description: t('approval'),
				icon: SwipeRightOutlinedIcon,
				title: 0
			}
		],
		[t, i18n.language]
	);

	return (
		<Grid>
			{resource.map((item, index) => (
				<Card key={index} className='dx-card'>
					<item.icon style={{ fontSize: '3rem' }} />
					<CardBody>
						<Typography variant='h3' css={{ fontWeight: '600 !important' }}>
							{item.title}
						</Typography>
						<Typography variant='p' className='disabled'>
							{item.description}
						</Typography>
					</CardBody>
				</Card>
			))}
		</Grid>
	);
};

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: stretch;
	gap: 24px;
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const Card = styled.div`
	height: 8rem;
	border-radius: 8px;
	padding: 1.5rem;
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: 2rem;
	align-items: center;
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		gap: 16px;
		padding: 16px;
	}
`;

const CardBody = styled.div`
	border-radius: 8px;
	display: flex;
	align-items: center;
	text-align: center;
	justify-self: center;
	align-self: center;
	justify-content: center;
	flex-direction: column;
	gap: 6px;
`;
export default Home;
