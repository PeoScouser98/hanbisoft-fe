import { signinSchema } from '@/app/validations/auth.validation';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import Typography from '@/common/components/Typography';
import useAuth from '@/common/hooks/useAuth';
import { useTypingAnimation } from '@/common/hooks/useTypingAnimation';
import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowForward } from '@mui/icons-material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Microsoft from '@mui/icons-material/Microsoft';
import { Button } from 'devextreme-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, FormWrapper, StyledLink } from './components';

const SigninPage: React.FunctionComponent = () => {
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(signinSchema)
	});

	const { signin } = useAuth();

	return (
		<Container>
			<HeroImage id='hero-image'>
				<Logo variant='h4'>
					<Microsoft /> Hanbisoft
				</Logo>
				<TypingTypography />
				<Typography variant='p' css={{ position: 'absolute', bottom: '24px' }}>
					© {new Date().getFullYear()} Hanbisoft, Inc. All rights reserved.
				</Typography>
			</HeroImage>

			<FormWrapper>
				<StyledLinkButton to='/about' className='dx-theme-text-color'>
					About us <ArrowForward css={{ fontSize: '16px !important' }} />
				</StyledLinkButton>
				<Form onSubmit={handleSubmit(signin)}>
					<Typography variant='h2' css={{ textAlign: 'center' }}>
						Sign in to your account
					</Typography>
					<Typography variant='p' css={{ textAlign: 'center', marginBottom: '24px' }}>
						Enter your email and password below to sign-in to your account
					</Typography>

					<TextFieldControl
						name='email'
						mode='text'
						control={control}
						label='Email'
						height={36}
						css={{ fontSize: '14px' }}
					/>
					<TextFieldControl
						name='password'
						mode='password'
						control={control}
						label='Password'
						height={36}
						css={{ fontSize: '14px' }}
					/>
					<StyledLink to='/auth/forgot-password'>Forgot password?</StyledLink>
					<Button
						type='default'
						focusStateEnabled={false}
						useSubmitBehavior
						stylingMode='contained'
						height={36}
						render={() => {
							return (
								<div
									css={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										gap: 4,
										fontSize: '16px'
									}}>
									Sign in <LoginOutlinedIcon />
								</div>
							);
						}}
					/>
				</Form>
			</FormWrapper>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.25fr;
	align-items: stretch;
	height: 100vh;
	width: 100%;
	background: none;
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: 1fr;
		& #hero-image {
			display: none;
		}
	}
`;
export const HeroImage = styled.div`
	display: block;
	position: relative;
	width: 100%;
	padding: 24px;
`;

const blink = keyframes`
   	50% {
			opacity: 0;
		}
`;
const StyledTypography = styled(Typography)`
	font-weight: 900 !important;
	user-select: none;
	/* color: white !important; */
	&::after {
		content: '|';
		color: inherit;
		font-weight: bold;
		display: inline-block;
		margin: 0 4px;
		animation: ${blink} 1s step-start infinite;
	}
`;

const TypingTypography: React.FunctionComponent = () => {
	const phases = ['Connecting Businesses, Optimizing Performance!', 'Manage Everything in One Place'];
	const { typedPhase, selectedPhase, resume, phase } = useTypingAnimation(phases, { repeat: true });

	React.useEffect(() => {
		if (typedPhase !== phases.at(-1)) resume();
	}, [typedPhase]);

	return (
		<Typography variant='h1'>
			<Typography variant='h1' color='accent' css={{ marginBottom: '12px' }}>
				Enterprise Resource Planning <br /> web application.
			</Typography>
			<StyledTypography variant='h2' color='accent' aria-label={selectedPhase}>
				{typedPhase}
			</StyledTypography>
		</Typography>
	);
};

const Logo = styled(Typography)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	font-weight: 700 !important;
	margin-bottom: 5rem;
`;

const StyledLinkButton = styled(Link)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	text-decoration: none;
	position: fixed;
	top: 16px;
	right: 16px;
`;

export default SigninPage;
