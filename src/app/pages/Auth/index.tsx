import LoadingProgressBar from '@/common/components/Loading/LoadingProgressBar';
import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { GridPattern, Pattern1, Pattern2 } from './components/Styled';

const AuthLayout: React.FunctionComponent = () => {
	return (
		<Container>
			<GridPattern />
			<Pattern1 />
			<Pattern2 />
			<React.Suspense fallback={<LoadingProgressBar />}>
				<Outlet />
			</React.Suspense>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	background-color: transparent;
	background: none;
	z-index: 999;
`;

export default AuthLayout;
