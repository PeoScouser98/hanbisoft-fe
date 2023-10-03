/**
 * @copyright PeoScouser98
 */

import { ITypographyProps } from '@/types/global';
import styled from '@emotion/styled';

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

const H1 = styled.h1<ITypographyProps>`
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	letter-spacing: -0.025em;
	font-weight: 900 !important;
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 20px;
	}
	@media screen and(${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 40px;
	}
	@media screen and (${({ theme }) => theme.breakpoints.desktop}) {
		font-size: 48px !important;
	}
`;

const H2 = styled.h2<ITypographyProps>`
	font-weight: bold;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 20px !important;
	}
	@media screen and (${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 24px !important;
	}
	@media screen and (min-width: 1366px) {
		font-size: 36px !important;
	}
`;

const H3 = styled.h3<ITypographyProps>`
	font-size: 28px !important;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 20px !important;
	}
	@media screen and (${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 22px !important;
	}
`;
const H4 = styled.h4<ITypographyProps>`
	font-size: 18px;
	font-weight: 600;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (max-width: 1365px) {
		font-size: 16px;
	}
`;

const P = styled.p<ITypographyProps>`
	font-size: 16px;
	line-height: 24px;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (max-width: 1365px) {
		font-size: 14px;
	}
`;
const Small = styled.span<ITypographyProps>`
	font-size: 14px;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
`;
