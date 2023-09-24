import navigation from '@/app/configs/navigation.config';
import { useGetUsersQuery } from '@/app/store/apis/user.api';
import Typography from '@/common/components/Typography';
import styled from '@emotion/styled';
import { TaskAltOutlined } from '@mui/icons-material';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { data } = useGetUsersQuery({});
	const { t, i18n } = useTranslation('home');

	const resource = React.useMemo<
		Array<{
			title: string;
			icon: any;
			description: string;
		}>
	>(
		() => [
			{
				title: t('number_of_users'),
				icon: Groups2OutlinedIcon,
				description: `${data?.length || 0} users`
			},
			{
				title: t('number_of_systems'),
				icon: DnsOutlinedIcon,
				description: '1 system'
			},
			{
				title: t('number_of_menus'),
				icon: MenuOutlinedIcon,
				description: `${navigation.filter((item) => !!item.path).length} menus`
			},
			{
				title: t('task'),
				icon: TaskAltOutlined,
				description: '0'
			},
			{
				title: t('completed'),
				icon: CheckOutlinedIcon,
				description: '0 task'
			},
			{
				title: t('in_progress'),
				icon: HourglassTopOutlinedIcon,
				description: '0 task'
			},
			{
				title: t('rejected'),
				icon: BlockOutlinedIcon,
				description: '0 rejected'
			}
		],
		[t, i18n.language]
	);

	return (
		<Grid>
			{resource.map((item, index) => (
				<Card key={index} className='dx-card'>
					<item.icon style={{ fontSize: '40px' }} />
					<CardBody>
						<Typography variant='h3'>{item.title}</Typography>
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
	@media screen and (min-width: 384px) and (max-width: 767px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (min-width: 768px) and (max-width: 1365px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const Card = styled.div`
	height: 10rem;
	border-radius: 8px;
	padding: 16px;
	display: flex;
	justify-content: flex-start;
	gap: 32px;
	align-items: start;
	@media screen and (min-width: 384px) and (max-width: 767px) {
		gap: 16px;
	}
`;

const CardBody = styled.div`
	border-radius: 8px;
	display: flex;
	align-items: flex-start;
	align-self: flex-start;
	flex-direction: column;
	gap: 6px;
`;
export default Home;
