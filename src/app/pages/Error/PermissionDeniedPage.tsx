import Typography from '@/core/components/Typography';
import { Button } from 'devextreme-react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
// import Typography from '@/core/components/Typography';

export default function PermissionDeniedPage() {
	const navigate = useNavigate();

	return (
		<Container>
			<ContentArea>
				<StatusCode>403</StatusCode>
				<Typography variant='h1'>Permission denied</Typography>
				<Typography variant='p' style={{ marginBottom: 32 }}>
					Sorry, we couldn’t allow you to access this page.
				</Typography>
				<ButtonList>
					<Button stylingMode='contained' icon='home' onClick={() => navigate('/')}>
						Go back home
					</Button>
					<Button stylingMode='text' icon='home'>
						Contact support
					</Button>
				</ButtonList>
			</ContentArea>
		</Container>
	);
}

const Container = styled.div.attrs({ className: 'dx-theme-background-color' })`
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
