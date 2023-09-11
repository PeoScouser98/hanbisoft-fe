import { styled } from 'styled-components';
import { ITypographyProps } from './t';

export default function Typography({ variant = 'p', children, color, ...props }: ITypographyProps) {
	switch (variant) {
		case 'h1':
			return (
				<H1 color={color} {...props}>
					{children}
				</H1>
			);
		case 'h2':
			return (
				<H2 color={color} {...props}>
					{children}
				</H2>
			);
		case 'h3':
			return (
				<H3 color={color} {...props}>
					{children}
				</H3>
			);
		case 'h4':
			return (
				<H4 color={color} {...props}>
					{children}
				</H4>
			);
		case 'p':
			return (
				<P color={color} {...props}>
					{children}
				</P>
			);
		case 'small':
			return (
				<Small color={color} {...props}>
					{children}
				</Small>
			);
		default:
			return (
				<P color={color} {...props}>
					{children}
				</P>
			);
	}
}

const H1 = styled.h1`
	font-size: 36px;
	font-weight: 800;
	color: ${(props) => (props.color ? props.theme.colors[props.color]?.main : 'inherit')};
	/* letter-spacing: -0.025em; */
	letter-spacing: var(--tracking-tight);
	@media screen and (min-width: 1366px) {
		font-size: 48px;
	}
`;
const H2 = styled.h2`
	font-size: 30px;
	font-weight: bold;
	color: ${(props) => (props.color ? props.theme.colors[props.color]?.main : 'inherit')};
	letter-spacing: var(--tracking-tight);
	@media screen and (min-width: 1366px) {
		font-size: 32px;
	}
`;
const H3 = styled.h3`
	font-size: 24px;
	font-weight: 600;
	color: ${(props) => (props.color ? props.theme.colors[props.color]?.main : 'inherit')};
	letter-spacing: var(--tracking-tight);
	@media screen and (max-width: 1365px) {
		font-size: 22px;
	}
`;
const H4 = styled.h4`
	font-size: 20px;
	font-weight: 600;
	color: ${(props) => (props.color ? props.theme.colors[props.color]?.main : 'inherit')};
	letter-spacing: var(--tracking-tight);
	@media screen and (max-width: 1365px) {
		font-size: 18px;
	}
`;

const P = styled.p`
	font-size: 16px;
	line-height: 28px;
	color: ${(props) => (props.color ? props.theme.colors[props.color]?.main : 'inherit')};
	@media screen and (max-width: 1365px) {
		font-size: 14px;
	}
`;
const Small = styled.small`
	font-size: 14px;
	color: ${(props) => (props.color ? props.theme.colors[props.color]?.main : 'inherit')};
	line-height: 24px;
`;
