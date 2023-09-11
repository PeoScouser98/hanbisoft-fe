import React from 'react';
import { styled } from 'styled-components';
import StatsBox from './components/StatsBox';

const Home = () => {
	return (
		<React.Fragment>
			<TopContentArea>
				{/* <Chart /> */}
				<StatsBox />
			</TopContentArea>
		</React.Fragment>
	);
};

const TopContentArea = styled.div`
	display: flex;
	align-items: stretch;
	gap: 24px;
	flex-grow: 1;
	@media screen and (max-width: 767px) {
		flex-direction: column;
	}
`;

export default Home;
