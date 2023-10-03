import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Pattern1 = styled.div`
	position: fixed;
	top: 0;
	opacity: 0.25;
	filter: blur(3rem);
	&::before {
		content: '';
		position: inherit;
		aspect-ratio: 1280/768;
		top: 0;
		transform: translate(75%, -25%);
		width: 48rem;
		background-image: linear-gradient(to right, #337ab7 60%, transparent 10%, #1ca8dd 30%);
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
	position: fixed;
	top: 0;
	opacity: 0.25;
	filter: blur(3rem);
	&::before {
		content: '';
		position: inherit;
		aspect-ratio: 1280/768;
		top: 0;
		transform: translate(-25%, 50%);
		width: 60rem;
		background-image: linear-gradient(to right, #337ab7 50%, transparent 20%, #1ca8dd 30%);
		clip-path: polygon(
			52.1% 44.1%,
			75% 61.6%,
			31.5% 26.9%,
			85.5% 0.1%,
			80.7% 2%,
			43.5% 32.5%,
			42.2% 62.4%,
			21.4% 68.1%,
			37.5% 58.3%,
			92.2% 34.5%,
			32.5% 76.7%,
			25% 64.9%,
			17.9% 100%,
			27.6% 76.8%,
			76.1% 97.7%,
			84.1% 44.1%
		);
	}
`;

export const Form = styled.form`
	padding: 24px;
	border-radius: 8px;
	max-width: 36rem;
	width: 100%;
	margin: 0 auto;
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

export const GridPattern: React.FunctionComponent = () => (
	<svg
		css={{
			position: 'fixed',
			inset: 0,
			top: 0,
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
