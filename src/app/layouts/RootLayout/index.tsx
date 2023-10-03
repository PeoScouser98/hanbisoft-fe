import styled from '@emotion/styled';
import PrivateLayout from '../RestrictedLayouts/PrivateLayout';
import Main from './components/Main';
import Header from './components/Navbar';

const RootLayout: React.FunctionComponent = () => {
	return (
		<PrivateLayout>
			<Container>
				<Header />
				<Main />
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
	overflow: hidden;
`;

export default RootLayout;
