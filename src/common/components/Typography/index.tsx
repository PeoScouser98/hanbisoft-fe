import React from 'react';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export declare interface ITypographyProps extends React.AllHTMLAttributes<HTMLElement>, React.PropsWithChildren {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
	color?: 'accent' | 'danger' | 'success' | 'warning';
	theme?: Theme;
	as?: keyof HTMLElementTagNameMap;
	[key: string]: any;
}

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
	font-size: 32px;
	font-weight: 800;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	letter-spacing: -0.025em;

	@media screen and (min-width: 384px) and (max-width: 767px) {
		font-size: 20px;
	}
	@media screen and (max-width: 1365px) {
		font-size: 48px;
	}
`;

const H2 = styled.h2`
	font-weight: 700;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (min-width: 384px) and (max-width: 767px) {
		font-size: 20px !important;
	}
	@media screen and (min-width: 768px) and (max-width: 1365px) {
		font-size: 24px !important;
	}
	@media screen and (min-width: 1366px) {
		font-size: 28px !important;
	}
`;

const H3 = styled.h3`
	font-size: 24px;
	font-weight: 700;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
	@media screen and (max-width: 1365px) {
		font-size: 22px;
	}
`;
const H4 = styled.h4`
	font-size: 18px;
	font-weight: 600;
	color: ${(props) => (props.color ? props.theme.colors[props.color] : 'inherit')};
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
