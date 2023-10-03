import styled from '@emotion/styled';
import { List } from 'devextreme-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import Typography from '@/common/components/Typography';
import Image from '@/common/components/FallbackImage';
import { useAppSelector } from '@/app/store/hook';

type Props = {};

const Profile = (props: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const { t } = useTranslation('user');
	const dataSource = [
		{
			id: 'display_name',
			label: t('fields.display_name'),
			value: user?.display_name,
			icon: PersonOutlineOutlinedIcon
		},
		{ id: 'email', label: t('fields.email'), value: user?.email, icon: MailOutlineOutlinedIcon },
		{ id: 'phone', label: t('fields.phone'), value: user?.phone || '-', icon: PhoneAndroidOutlinedIcon },
		{ id: 'address', label: t('fields.address'), icon: LocationOnOutlinedIcon, value: user?.address }
	];
	return (
		<Card className='dx-card dx-theme-border-color'>
			<Image
				src={user?.picture}
				css={{
					width: '6rem',
					height: '6rem',
					objectFit: 'contain',
					objectPosition: 'center',
					borderRadius: '9999px'
				}}
			/>

			<List
				dataSource={dataSource}
				allowItemDeleting={false}
				displayExpr='value'
				itemRender={(item) => (
					<ItemTemplate key={item.id}>
						<Typography variant='p' css={{ fontWeight: '700 !important', display: 'inline-flex', gap: '8px' }}>
							<item.icon css={{ fontSize: '20px' }} /> {item.label}
						</Typography>

						<Typography
							variant='p'
							id={item.id}
							css={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
							{item.value}
						</Typography>
					</ItemTemplate>
				)}
			/>
		</Card>
	);
};
const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	padding: 1rem;
`;

const ItemTemplate = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 3rem;
`;

export default React.memo(Profile);
