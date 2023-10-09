/**
 * @copyright PeoScouser98
 */

import useDxTheme from '@/common/hooks/useDxTheme';
import { ITypographyProps } from '@/types/global';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

const Typography = (props: ITypographyProps) => {
	const { currentTheme } = useDxTheme();

	switch (props.variant) {
		case 'h1':
			return (
				<H1 mode={currentTheme.mode} {...props}>
					{props.children}
				</H1>
			);
		case 'h2':
			return (
				<H2 mode={currentTheme.mode} {...props}>
					{props.children}
				</H2>
			);
		case 'h3':
			return (
				<H3 mode={currentTheme.mode} {...props}>
					{props.children}
				</H3>
			);
		case 'p':
			return (
				<P mode={currentTheme.mode} {...props}>
					{props.children}
				</P>
			);
		case 'small':
			return (
				<Small mode={currentTheme.mode} {...props}>
					{props.children}
				</Small>
			);
		default:
			return (
				<P mode={currentTheme.mode} {...props}>
					{props.children}
				</P>
			);
	}
};

const lineClampCss = css`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const H1 = styled.h1<ITypographyProps & { mode: string }>`
	letter-spacing: -0.025em;
	display: block;
	font-size: 2rem !important;
	font-weight: bolder !important;
	-webkit-line-clamp: ${(props) => props.lineClamp || 'initial'};
	${(props) => (props.lineClamp ? lineClampCss : null)}
	color: ${({ theme, color, mode }) => (color ? theme.colors[color]?.[mode] : 'inherit')};
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1.5rem !important;
	}
	@media screen and(${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.75rem !important;
	}
`;

const H2 = styled.h2<ITypographyProps & { mode: string }>`
	font-weight: bolder !important;
	font-size: 1.5rem !important;
	-webkit-line-clamp: ${(props) => props.lineClamp || 'initial'};
	${(props) => (props.lineClamp ? lineClampCss : null)}
	color: ${({ theme, color, mode }) => (color ? theme.colors[color]?.[mode] : 'inherit')};
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1rem !important;
	}
	@media screen and (${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.25rem !important;
	}
`;

const H3 = styled.h3<ITypographyProps & { mode: string }>`
	font-weight: bolder !important;
	font-size: 1.15rem !important;
	-webkit-line-clamp: ${(props) => props.lineClamp || 'initial'};
	${(props) => (props.lineClamp ? lineClampCss : null)}
	color: ${({ theme, color, mode }) => (color ? theme.colors[color]?.[mode] : 'inherit')};
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1rem !important;
	}
	@media screen and (${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1rem !important;
	}
`;

const P = styled.p<ITypographyProps & { mode: string }>`
	-webkit-line-clamp: ${(props) => props.lineClamp || 'initial'};
	${(props) => (props.lineClamp ? lineClampCss : '')}
	color: ${({ theme, color, mode }) => (color ? theme.colors[color]?.[mode] : 'inherit')};
`;

const Small = styled.span<ITypographyProps & { mode: string }>`
	color: ${({ theme, color, mode }) => (color ? theme.colors[color]?.[mode] : 'inherit')};
`;

export default Typography;
