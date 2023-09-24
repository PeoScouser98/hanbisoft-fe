import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@/app/store/hook';
import Image from '@/common/components/FallbackImage';
import Typography from '@/common/components/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { List } from 'devextreme-react';
import { useTranslation } from 'react-i18next';
import { UserRoleEnum } from '@/common/constants/_app.const';

type Props = {};

const Profile = (props: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const { t } = useTranslation('profile');
	const dataSource = [
		{
			label: t('fields.display_name'),
			value: user?.displayName,
			icon: PersonOutlineOutlinedIcon
		},
		{
			label: t('fields.email'),
			value: user?.email,
			icon: MailOutlineOutlinedIcon
		},
		{
			label: t('fields.phone'),
			value: user?.phone,
			icon: PhoneAndroidOutlinedIcon
		},
		{
			label: t('fields.address'),
			icon: LocationOnOutlinedIcon,
			value: user?.address
		}
	];
	return (
		<Container className='dx-card dx-theme-border-color'>
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
					<ItemTemplate>
						<Typography variant='p' css={{ fontWeight: '700 !important', display: 'inline-flex', gap: '8px' }}>
							<item.icon css={{ fontSize: '20px' }} /> {item.label}
						</Typography>
						<Typography variant='p'>{item.value}</Typography>
					</ItemTemplate>
				)}
			/>
		</Container>
	);
};
const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
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
