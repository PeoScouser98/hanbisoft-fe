import React from 'react';
import useMediaQuery from '@/common/hooks/useMediaQuery';
import { OpenedStateMode } from 'devextreme/ui/drawer';
import { Drawer } from 'devextreme-react';
import AsideNavigation from './AsideNavigation';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PreferenceToolbar from './PreferenceToolbar';
import TabNavigation from './TabNavigation';

const Main: React.FunctionComponent = () => {
	const isLargeScreen = useMediaQuery('(min-width: 1366px)');

	const [open, setOpenState] = React.useState<boolean>(isLargeScreen);
	const [openedStateMode, setOpenedStateMode] = React.useState<OpenedStateMode>();

	React.useEffect(() => {
		setOpenedStateMode(() => (isLargeScreen ? 'shrink' : 'overlap'));
		setOpenState(isLargeScreen);
	}, [isLargeScreen]);

	const handleOpenStateChange = React.useCallback(setOpenState, [isLargeScreen]);
	return (
		<Drawer
			opened={open}
			component={AsideNavigation}
			animationDuration={300}
			defaultOpened={isLargeScreen}
			openedStateMode={openedStateMode}
			closeOnOutsideClick={!isLargeScreen}
			maxSize={288}
			onOpenedChange={handleOpenStateChange}
			revealMode='expand'
			position='left'
			activeStateEnabled={false}
			hoverStateEnabled={false}
			focusStateEnabled={false}
			shading={openedStateMode === 'overlap'}
			css={css`
				& .dx-drawer-panel-content {
					width: fit-content;
				}
				& .dx-drawer-wrapper {
					height: calc(100vh - 3rem);
				}
			`}>
			<DrawerContent id='content'>
				<PreferenceToolbar open={open} onOpenStateChange={handleOpenStateChange} />
				<TabNavigation />
			</DrawerContent>
		</Drawer>
	);
};

const DrawerContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: inherit;
	width: 100%;
`;

export default React.memo(Main);
