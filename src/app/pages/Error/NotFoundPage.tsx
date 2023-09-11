import { Button } from 'devextreme-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const NotFoundPage: React.FunctionComponent = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<ContentArea>
				<StatusCode>404</StatusCode>
				<Typography style={{ fontSize: 48 }}>Page not found</Typography>
				<Typography as='p' style={{ marginBottom: 32 }}>
					Sorry, we couldn’t find the page you’re looking for.
				</Typography>
				<ButtonList>
					<Button stylingMode='contained' icon='house' onClick={() => navigate('/')}>
						Go back home
					</Button>
					<Button stylingMode='text' icon='home'>
						Contact support
					</Button>
				</ButtonList>
			</ContentArea>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ContentArea = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 6px;
`;
const StatusCode = styled.code`
	color: #d9534f;
	font-weight: 600;
`;
const ButtonList = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;
`;
const Typography = styled.h1`
	margin-bottom: 8px;
`;

export default NotFoundPage;
