import signinSchema from '@/app/validations/auth.validation';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import Typography from '@/common/components/Typography';
import useAuth from '@/common/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import Microsoft from '@mui/icons-material/Microsoft';
import { Button } from 'devextreme-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Container,
	Form,
	FormWrapper,
	GridPattern,
	HeroImage,
	Pattern1,
	Pattern2,
	StyledLink,
	TypingTypography
} from './components/Styled';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

export default function Signin() {
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(signinSchema)
	});

	const {
		signin,
		signinStates: { isLoading }
	} = useAuth();

	return (
		<Container>
			<HeroImage id='hero-image'>
				<Logo variant='h4'>
					<Microsoft /> Hanbisoft
				</Logo>
				<TypingTypography />
				<Typography variant='p' css={{ color: 'white !important', position: 'absolute', bottom: '24px' }}>
					© {new Date().getFullYear()} Hanbisoft, Inc. All rights reserved.
				</Typography>
			</HeroImage>
			<GridPattern />
			<FormWrapper>
				<Pattern1 />
				<Pattern2 />
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
									Sign in <LoginOutlinedIcon />
								</div>
							);
						}}
					/>
				</Form>
			</FormWrapper>
		</Container>
	);
}

const Logo = styled(Typography)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 4px;
	color: white !important;
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
