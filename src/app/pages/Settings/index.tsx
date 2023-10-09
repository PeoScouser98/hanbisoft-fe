import RestrictedPermissionLayout from '@/app/layouts/RestrictedLayouts/RestrictedPermissionLayout';
import useQueryParams from '@/common/hooks/useQueryParams';
import styled from '@emotion/styled';
import { Tabs } from 'devextreme-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AccessManagementPanel from './components/AccessManagementPanel';
import MenuSettingPanel from './components/MenuSettingPanel';
import SiteSettingFormPanel from './components/SiteSettingsFormPanel';

const SiteSettingsPage: React.FunctionComponent = () => {
	const { setParam, getParam } = useQueryParams();
	const { t, i18n } = useTranslation('site_settings');
	const tabRef = React.useRef<typeof Tabs.prototype>(null);
	const selectedIndex = React.useMemo(() => (!!getParam('tab') ? +getParam('tab') : 0), [getParam]);
	const tabs = React.useMemo(
		() => [
			{
				id: 0,
				text: t('tabs.site_settings'),
				icon: 'preferences',
				allowDrag: false,
				content: <SiteSettingFormPanel />
			},
			{
				id: 1,
				text: t('tabs.access_management'),
				icon: 'group',
				allowDrag: false,
				content: <AccessManagementPanel />
			},
			{
				id: 2,
				text: t('tabs.menu_settings'),
				allowDrag: false,
				icon: 'folder',
				content: <MenuSettingPanel />
			}
		],
		[t, i18n.language]
	);

	const handleChangeTab = (value) => {
		const tabIndex = value?.id ?? selectedIndex;
		setParam('tab', tabIndex);
	};

	return (
		<RestrictedPermissionLayout>
			<Tabs
				ref={tabRef}
				dataSource={tabs}
				hoverStateEnabled={false}
				focusStateEnabled={false}
				selectedIndex={selectedIndex}
				css={{ fontWeight: 'bold' }}
				selectionMode='single'
				scrollByContent
				showNavButtons
				onSelectedItemChange={handleChangeTab}
			/>
			<TabPanel className='content'>{tabs[selectedIndex]?.content}</TabPanel>
		</RestrictedPermissionLayout>
	);
};

const TabPanel = styled.div`
	padding: 1rem 0;
`;

export default SiteSettingsPage;
