import styled from '@emotion/styled';
import PrivateLayout from '../RestrictedLayouts/PrivateLayout';
import Main from './components/Main';
import Header from './components/Navbar';
import React from 'react';
import NotificationPanel from './components/NotificationPanel';

const RootLayout: React.FunctionComponent = () => {
	const [open, setOpen] = React.useState<boolean>(false);
	const handleToggleNotifyPanel = React.useCallback(setOpen, []);

	return (
		<PrivateLayout>
			<Container>
				<Header open={open} onOpenStateChange={handleToggleNotifyPanel} />
				<Main />
				<NotificationPanel open={open} onOpenStateChange={handleToggleNotifyPanel} />
			</Container>
		</PrivateLayout>
	);
};

const Container = styled.main`
	position: relative;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	z-index: 10;
	overflow: hidden;
`;

export default RootLayout;
