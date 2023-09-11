/* eslint-disabled */
import React from 'react';
import { styled } from 'styled-components';

const Box = styled.div<Partial<React.CSSProperties>>`
	display: ${(props) => props.display};
	flex-direction: ${(props) => props.flexDirection};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	text-align: ${(props) => props.textAlign};
	background-color: ${(props) => props.backgroundColor};
	padding: ${(props) => props.padding};
	padding-top: ${(props) => props.paddingTop};
	padding-bottom: ${(props) => props.paddingBottom};
	padding-right: ${(props) => props.paddingRight};
	padding-left: ${(props) => props.paddingLeft};
	margin: ${(props) => props.margin};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	position: ${(props) => (props.position ??= 'relative')};
	top: ${(props) => props.top};
	bottom: ${(props) => props.bottom};
	left: ${(props) => props.left};
	right: ${(props) => props.right};
	grid-template-columns: ${(props) => props.gridTemplateColumns};
	grid-gap: ${(props) => (typeof props.gap === 'number' ? `${props.gap}px` : props.gap)};
	grid-row-gap: ${(props) => props.gridRowGap};
	grid-column-gap: ${(props) => props.gridColumnGap};

	/* Other CSS properties */
`;
export default Box;
