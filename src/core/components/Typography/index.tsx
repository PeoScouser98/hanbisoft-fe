import { styled } from 'styled-components';
import { ITypographyProps } from './_type';

export default function Typography(props: ITypographyProps) {
	switch (props.variant) {
		case 'h1':
			return <H1 {...props}>{props.children}</H1>;
		case 'h2':
			return <H2 {...props}>{props.children}</H2>;
		case 'h3':
			return <H3 {...props}>{props.children}</H3>;
		case 'h4':
			return <H4 {...props}>{props.children}</H4>;
		case 'p':
			return <P {...props}>{props.children}</P>;
		case 'small':
			return <Small {...props}>{props.children}</Small>;
		default:
			return <P {...props}>{props.children}</P>;
	}
}

const H1 = styled.h1`
	font-size: 72px;
	font-weight: 800;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	letter-spacing: -0.025em;
	letter-spacing: var(--tracking-tight);
	@media screen and (max-width: 1365px) {
		font-size: 48px;
	}
`;

const H2 = styled.h2`
	font-size: 30px;
	font-weight: bold;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	letter-spacing: var(--tracking-tight);
	@media screen and (min-width: 1366px) {
		font-size: 32px;
	}
`;

const H3 = styled.h3`
	font-size: 24px;
	font-weight: 700;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	letter-spacing: var(--tracking-tight);
	@media screen and (max-width: 1365px) {
		font-size: 22px;
	}
`;
const H4 = styled.h4`
	font-size: 18px;
	font-weight: 600;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	letter-spacing: var(--tracking-tight);
	@media screen and (max-width: 1365px) {
		font-size: 16px;
	}
`;

const P = styled.p`
	font-size: 16px;
	line-height: 24px;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (max-width: 1365px) {
		font-size: 14px;
	}
`;
const Small = styled.span`
	font-size: 14px;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
`;
