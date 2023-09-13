import TextFieldControl from '@/core/components/FormControls/TextFieldControl';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from '@/app/hooks/useAuth';
import DxIcon from '@/core/components/DxIcon';
import Typography from '@/core/components/Typography';
import { Button } from 'devextreme-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import signinSchema from '../../../validations/auth.validation';
import { IUser } from '@/core/types/user';

const Signin: React.FC<unknown> = () => {
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(signinSchema)
	});

	const { signin } = useAuth();

	return (
		<Container>
			<FormWrapper>
				<Form onSubmit={handleSubmit(signin)}>
					<Typography
						variant='h3'
						color='accent'
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							gap: '4px',
							marginBottom: '8px'
						}}>
						<DxIcon type='mediumiconslayout' style={{ fontSize: 'inherit' }} /> Hanbisoft
					</Typography>
					<Typography variant='h2' style={{ textAlign: 'center', marginBottom: '32px' }}>
						Sign in to your account
					</Typography>

					<TextFieldControl name='email' mode='text' control={control} label='Email' />
					<TextFieldControl name='password' mode='password' control={control} label='Password' />
					<StyledLink to='/forgot-password'>Forgot password?</StyledLink>
					<Button
						type='default'
						focusStateEnabled={false}
						icon={
							/* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>`
						}
						text='Sign in'
						useSubmitBehavior
					/>
				</Form>
			</FormWrapper>
		</Container>
	);
};

const Container = styled.div.attrs({
	className: ' dx-theme-background-color dx-theme-text-color'
})`
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-columns: minmax(1fr);
	align-items: center;
	height: 100vh;
	width: 100%;
	@media screen and (max-width: 767px) {
		grid-template-columns: 1fr;
		& #hero-image {
			display: none;
		}
	}
`;

const Form = styled.form`
	padding: 24px;
	border-radius: 8px;
	width: 32rem;
	display: flex;
	flex-direction: column;
	gap: 12px;
	@media screen and (max-width: 767px) {
		width: 28rem;
	}
`;

const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledLink = styled(Link)`
	font-size: 12px;
	text-decoration: none;
	color: inherit;
`;

export default Signin;
