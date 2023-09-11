import TextFieldControl from '@/core/components/FormControls/TextFieldControl';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from '@/app/hooks/useAuth';
import Typography from '@/core/components/Typography';
import { Button } from 'devextreme-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import signinSchema from './helper/siginSchema';
import Image from '@/app/assets/hero-image.avif';

type FormValues = {
	email: string;
	password: string;
};

const Signin: React.FunctionComponent = () => {
	const { control, handleSubmit } = useForm<FormValues>({
		resolver: yupResolver<FormValues>(signinSchema)
	});

	const { signin } = useAuth();

	return (
		<Container>
			<FormWrapper>
				<Form onSubmit={handleSubmit(signin)}>
					<Typography variant='h3' color='accent' style={{ textAlign: 'center', marginBottom: '24px' }}>
						Sign in to your account
					</Typography>

					<TextFieldControl name='email' type='text' control={control} label='Email' />
					<TextFieldControl name='password' type='password' control={control} label='Password' />
					<StyledLink to='/forgot-password'>Forgot password?</StyledLink>
					<Button type='default' focusStateEnabled={false} icon='login' text='Sign in' useSubmitBehavior />
				</Form>
			</FormWrapper>
			<HeroImage src={Image} />
		</Container>
	);
};

const HeroImage = styled.img.attrs({ id: 'hero-image' })`
	display: block;
	height: 100vh;
	width: 100%;
	object-fit: contain;
	object-position: center;
`;

const Container = styled.div.attrs({
	className: ' dx-theme-background-color dx-theme-text-color'
})`
	display: grid;
	grid-template-columns: 1fr 1fr;
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

const StyledLink = styled(Link)(({ theme }) => ({
	fontSize: '12px',
	color: theme.colors?.accent?.main,
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline'
	}
}));

export default Signin;
