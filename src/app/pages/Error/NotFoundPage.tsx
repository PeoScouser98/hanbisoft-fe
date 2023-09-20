import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { closePage } from '@/app/store/reducers/page.reducer';
import Typography from '@/common/components/Typography';
import { useTheme } from '@emotion/react';
import { Button } from 'devextreme-react';
import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { currentPage } = useAppSelector((state) => state.pages);

	React.useEffect(() => {
		if (currentPage.path !== '/') dispatch(closePage(currentPage)); // Close current page that is not found
	}, []);

	return (
		<Container className='dx-theme-background-color dx-theme-text-color'>
			<ContentArea>
				<StatusCode>404</StatusCode>
				<Typography variant='h1'>Page not found</Typography>
				<Typography variant='p' style={{ marginBottom: 32 }}>
					Sorry, we couldn’t find the page you’re looking for.
				</Typography>
				<ButtonList>
					<Button
						stylingMode='contained'
						type='default'
						icon='home'
						onClick={
							() => navigate(-1) // Navigate to the previous page
						}
						text='Go back'
					/>
					<ContactButton stylingMode='text' type='normal' text='Contact support' icon='to' />
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
	font-size: 16px;
	color: ${({ theme }) => theme.colors?.danger};
	font-weight: 600;
`;

const ButtonList = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;
`;

const ContactButton = styled(Button)`
	& + .dx-icon-to {
		float: right;
	}
`;

export default NotFoundPage;
