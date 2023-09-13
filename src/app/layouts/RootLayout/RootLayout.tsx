import useMediaQuery from '@/app/hooks/useScreenSize';
import LoadingProgressBar from '@/core/components/Loading/LoadingProgressBar';
import { Drawer } from 'devextreme-react';
import { OpenedStateMode } from 'devextreme/ui/drawer';
import React from 'react';
import styled from 'styled-components';
import PrivateLayout from '../PrivateLayout';
import AsideNavigation from './components/AsideNavigation';
import Footer from './components/Footer';
import HeaderNavigation from './components/HeaderNavigation';
import PreferenceToolbar from './components/PreferenceToolbar';
import TabNavigation from './components/TabNavigation';

export default function RootLayout() {
	const [open, setOpenState] = React.useState(true);
	const [openedStateMode, setOpenedStateMode] = React.useState<OpenedStateMode>('shrink');
	const isLargeScreen = useMediaQuery('(min-width: 1366px)');

	React.useEffect(() => {
		setOpenedStateMode((_) => (isLargeScreen ? 'shrink' : 'overlap'));
		setOpenState(isLargeScreen);
	}, [isLargeScreen]);

	const handleOpenStateChange = React.useCallback(setOpenState, []);

	return (
		<PrivateLayout>
			<React.Suspense fallback={<LoadingProgressBar />}>
				<Container>
					<HeaderNavigation />
					<StyledDrawer
						opened={open}
						component={AsideNavigation}
						animationDuration={300}
						defaultOpened={isLargeScreen}
						openedStateMode={openedStateMode}
						minSize={0}
						closeOnOutsideClick={!isLargeScreen}
						revealMode='expand'
						shading={!isLargeScreen}>
						<DrawerContent>
							<PreferenceToolbar open={open} onOpenStateChange={handleOpenStateChange} />
							<TabNavigation />
							<Footer />
						</DrawerContent>
					</StyledDrawer>
				</Container>
			</React.Suspense>
		</PrivateLayout>
	);
}

const Container = styled.main`
	position: relative;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
`;

const StyledDrawer = styled(Drawer)`
	& .dx-drawer-wrapper {
		height: calc(100vh - 3.5rem);
	}
`;

const DrawerContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: inherit;
	height: 100%;
	font-size: 16px;
`;
