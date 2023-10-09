import authService from '@/app/services/api/auth.service';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import Typography from '@/common/components/Typography';
import styled from '@emotion/styled';
import Microsoft from '@mui/icons-material/Microsoft';
import { Button } from 'devextreme-react';
import Form, { GroupItem } from 'devextreme-react/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ForgotPassword: React.FunctionComponent = () => {
	const { control, handleSubmit } = useForm();
	const navigate = useNavigate();

	const handleGetRecoverPassword = (data) => {
		toast.promise(() => authService.getRecoverPassword(data), {
			loading: 'Getting recover password',
			success: (response) => {
				navigate('/auth/signin');
				return response?.message || 'Recover password was sent to you email';
			},
			error: () => {
				return 'Failed to get recover password';
			}
		});
	};

	return (
		<Container>
			<Box>
				<Logo variant='h3'>
					<Microsoft /> Hanbisoft
				</Logo>
				<Typography variant='h3' css={{ textAlign: 'center', marginBottom: '0.5rem' }}>
					Recover your password
				</Typography>
				<Typography variant='p' css={{ textAlign: 'center', marginBottom: '2rem' }}>
					Enter your email in order to receive new password
				</Typography>
				<form onSubmit={handleSubmit(handleGetRecoverPassword)}>
					<Form>
						<GroupItem>
							<TextFieldControl control={control} name='email' label='Email' mode='email' height={36} />
						</GroupItem>
						<GroupItem>
							<Button useSubmitBehavior width='100%' height={36} type='default' css={{ fontSize: '14px' }}>
								<Typography variant='p' className='dx-button-text'>
									Get recover password
								</Typography>
							</Button>
						</GroupItem>
					</Form>
				</form>
			</Box>
		</Container>
	);
};

const Container = styled.div`
	height: inherit;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Logo = styled(Typography)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	text-align: center;
	font-weight: 700 !important;
	margin-bottom: 3rem;
	& .MuiSvgIcon-root {
		font-size: inherit;
	}
`;

const Box = styled.div`
	max-width: 468px;
	margin: 0 auto;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: stretch;
`;

export default ForgotPassword;
