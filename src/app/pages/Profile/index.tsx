import styled from '@emotion/styled';
import { Tabs } from 'devextreme-react';
import React from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import EditProfileForm from './components/EditProfileForm';
import Profile from './components/Profile';
import { useTranslation } from 'react-i18next';
import { useGetUserInfoQuery } from '@/app/store/apis/auth.api';
import useQueryParams from '@/common/hooks/useQueryParams';

const ProfilePage = () => {
	const { setParam, getParam } = useQueryParams();
	const { data } = useGetUserInfoQuery();
	const selectedIndex = React.useMemo(() => (!!getParam('tab') ? +getParam('tab') : 0), [getParam]);
	const { t, i18n } = useTranslation('user');
	const tabs = React.useMemo(
		() => [
			{
				id: 0,
				text: t('title.profile_settings'),
				icon: 'user',
				content: <EditProfileForm />
			},
			{
				id: 1,
				text: t('title.change_password'),
				icon: 'key',
				content: <ChangePasswordForm />
			}
		],
		[data, t, i18n.language]
	);
	const handleChangeTab = (value) => {
		const tabIndex = value?.id ?? selectedIndex;
		setParam('tab', tabIndex);
	};

	return (
		<Container>
			<Profile />
			<div>
				<Tabs
					aria-label='Tab'
					dataSource={tabs}
					hoverStateEnabled={false}
					focusStateEnabled={false}
					selectedIndex={selectedIndex}
					scrollingEnabled
					repaintChangesOnly
					selectionMode='single'
					onSelectedItemChange={handleChangeTab}
				/>
				<TabPanel className='content'>{tabs[selectedIndex].content}</TabPanel>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: 1fr;
	gap: 1.5rem;
	align-items: stretch;
	@media screen and (${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (${({ theme }) => theme.breakpoints.desktop}) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const TabPanel = styled.div`
	padding: 1rem 0;
`;

export default ProfilePage;
