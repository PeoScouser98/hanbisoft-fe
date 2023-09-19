import Image from '@/assets/hero-image.png';
import Icon from '@/common/components/DxIcon';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import Typography from '@/common/components/Typography';
import useAuth from '@/common/hooks/useAuth';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'devextreme-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import signinSchema from '../../../validations/auth.validation';

const Signin: React.FC<unknown> = () => {
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(signinSchema)
	});

	const { signin } = useAuth();

	return (
		<Container className='dx-theme-background-color dx-theme-text-color'>
			<FormWrapper>
				<Form onSubmit={handleSubmit(signin)}>
					<Typography
						variant='h3'
						color='accent'
						css={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							gap: '4px',
							marginBottom: '8px'
						}}>
						<Icon type='mediumiconslayout' css={{ fontSize: '24px' }} /> Hanbisoft
					</Typography>
					<Typography variant='h2' css={{ textAlign: 'center', marginBottom: '32px' }}>
						Sign in to your account
					</Typography>

					<TextFieldControl name='email' mode='text' control={control} label='Email' />
					<TextFieldControl name='password' mode='password' control={control} label='Password' />
					<StyledLink to='/forgot-password'>Forgot password?</StyledLink>
					<Button
						type='default'
						focusStateEnabled={false}
						useSubmitBehavior
						render={() => {
							return (
								<div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
									Sign in
								</div>
							);
						}}
					/>
				</Form>
			</FormWrapper>

			<HeroImage id='hero-image' src={Image} />
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.5fr;
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

const HeroImage = styled.img`
	display: block;
	height: 100vh;
	width: 100%;
	object-fit: cover;
	object-position: center;
`;

export default Signin;
