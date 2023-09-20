import Typography from '@/common/components/Typography';
import { useTypingAnimation } from '@/common/hooks/useTypingAnimation';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Pattern1 = styled.div`
	position: absolute;
	top: 0;
	opacity: 0.3;
	filter: blur(3rem);
	&::before {
		content: '';
		position: inherit;
		aspect-ratio: 1280/768;
		top: 0;
		transform: translate(-16rem, 4rem);
		width: 30rem;
		background-image: linear-gradient(to right, #6366f1 50%, transparent 20%, #4f46e5 30%);
		clip-path: polygon(
			80.1% 44.1%,
			100% 61.6%,
			97.5% 26.9%,
			85.5% 0.1%,
			80.7% 2%,
			72.5% 32.5%,
			60.2% 62.4%,
			52.4% 68.1%,
			47.5% 58.3%,
			45.2% 34.5%,
			27.5% 76.7%,
			0.1% 64.9%,
			40.9% 100%,
			27.6% 76.8%,
			76.1% 97.7%,
			74.1% 44.1%
		);
	}
`;
export const Pattern2 = styled.div`
	position: absolute;
	top: 0;
	opacity: 0.3;
	filter: blur(3rem);
	&::before {
		content: '';
		position: inherit;
		aspect-ratio: 1280/768;
		top: 0;
		transform: translate(8rem, 32rem);
		width: 32rem;
		background-image: linear-gradient(to right, #6366f1 50%, transparent 20%, #4f46e5 30%);
		clip-path: polygon(
			74.1% 44.1%,
			100% 61.6%,
			97.5% 26.9%,
			85.5% 0.1%,
			80.7% 2%,
			72.5% 32.5%,
			60.2% 62.4%,
			52.4% 68.1%,
			47.5% 58.3%,
			45.2% 34.5%,
			27.5% 76.7%,
			0.1% 64.9%,
			17.9% 100%,
			27.6% 76.8%,
			76.1% 97.7%,
			74.1% 44.1%
		);
	}
`;

export const TypingTypography = () => {
	const phases = ['Connecting Businesses, Optimizing Performance!', 'Manage Everything in One Place'];
	const { typedPhase, selectedPhase, resume, phase } = useTypingAnimation(phases, { repeat: true });

	useEffect(() => {
		if (typedPhase !== phases.at(-1)) resume();
	}, [typedPhase]);

	return (
		<Typography variant='h1' css={{ color: 'white !important' }}>
			<Typography variant='h1' color='accent' css={{ marginBottom: '12px' }}>
				Enterprise Resource Planning <br /> web application.
			</Typography>
			<StyledTypography variant='h2' color='accent' aria-label={selectedPhase}>
				{typedPhase}
			</StyledTypography>
		</Typography>
	);
};

const blink = keyframes`
   	50% {
			opacity: 0;
		}
`;
const StyledTypography = styled(Typography)`
	font-weight: 900 !important;
	user-select: none;
	color: white !important;
	&::after {
		content: '|';
		color: inherit;
		font-weight: bold;
		animation: ${blink} 1s step-start infinite;
	}
`;

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	align-items: stretch;
	height: 100vh;
	width: 100%;
	@media screen and (max-width: 767px) {
		grid-template-columns: 1fr;
		& #hero-image {
			display: none;
		}
	}
`;

export const Form = styled.form`
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

export const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	max-width: 100%;
	overflow: hidden;
`;

export const StyledLink = styled(Link)`
	font-size: 12px;
	text-decoration: none;
	color: inherit;
`;

export const HeroImage = styled.div`
	display: block;
	position: relative;
	height: 100vh;
	width: 100%;
	background-color: #111827;
	padding: 24px;
	box-shadow: 4px 0 32px #111827;
`;

export const GridPattern = () => (
	<svg
		css={{
			position: 'fixed',
			inset: 0,
			zIndex: -10,
			width: '100%',
			height: '100%',
			stroke: '#6b728025',
			maskImage: 'radial-gradient(100%, 100% at top right, white, transparent)'
		}}
		aria-hidden='true'>
		<defs>
			<pattern
				id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
				width={200}
				height={200}
				x='50%'
				y={-1}
				patternUnits='userSpaceOnUse'>
				<path d='M.5 200V.5H200' fill='none' />
			</pattern>
		</defs>
		<rect width='100%' height='100%' strokeWidth={0} fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)' />
	</svg>
);
