import RestrictedPermissionLayout from '@/app/layouts/RestrictedLayouts/RestrictedPermissionLayout';
import useQueryParams from '@/common/hooks/useQueryParams';
import styled from '@emotion/styled';
import { Tabs } from 'devextreme-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AccessManagementPanel from './components/PermissionManagementPanel';
import PermissionsManagementPanel from './components/AccessManagementPanel';
import SiteSettingFormPanel from './components/SiteSettingPanel';
import CommonCodePanel from './components/CommonCodesPanel';

const SiteSettingsPage: React.FunctionComponent = () => {
	const { setParam, getParam } = useQueryParams();
	const { t, i18n } = useTranslation('system_settings');
	const tabRef = React.useRef<typeof Tabs.prototype>(null);
	const selectedIndex = React.useMemo(() => (!!getParam('tab') ? +getParam('tab') : 0), [getParam]);
	const tabs = React.useMemo(
		() => [
			{
				id: 0,
				text: t('tabs.site_settings'),
				icon: 'preferences',
				allowDraging: false,
				content: <SiteSettingFormPanel />
			},
			{
				id: 1,
				text: t('tabs.permissions_management'),
				icon: 'group',
				allowDraging: false,
				content: <AccessManagementPanel />
			},
			{
				id: 2,
				text: t('tabs.access_management'),
				allowDraging: false,
				icon: 'unlock',
				content: <PermissionsManagementPanel />
			},
			{
				id: 2,
				text: t('tabs.common_codes'),
				allowDraging: false,
				icon: 'codeblock',
				content: <CommonCodePanel />
			}
		],
		[t, i18n.language]
	);

	return (
		<RestrictedPermissionLayout>
			<Wrapper>
				<Tabs
					focusStateEnabled={false}
					ref={tabRef}
					dataSource={tabs}
					selectedIndex={selectedIndex}
					css={{ fontWeight: 'bold' }}
					selectionMode='single'
					scrollByContent
					showNavButtons
					onItemClick={(e) => {
						const tabIndex = e.itemIndex ?? selectedIndex;
						setParam('tab', tabIndex);
					}}
				/>
				<TabPanel className='content'>{tabs[selectedIndex]?.content}</TabPanel>
			</Wrapper>
		</RestrictedPermissionLayout>
	);
};

const Wrapper = styled.div`
	margin: 1rem auto;
`;

const TabPanel = styled.div`
	padding: 1rem 0.25rem;
`;

export default SiteSettingsPage;
