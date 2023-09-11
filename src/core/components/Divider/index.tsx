import { styled } from 'styled-components';
import { TDividerProps } from './t';

const Divider = styled.hr.attrs({ className: 'dx-theme-background-color dx-theme-text-color' })<TDividerProps>`
	display: block;
	background-color: inherit;
	color: inherit;
	border: none;
	outline: none;
	min-height: 100%;
	height: ${(props) => (props.height ? props.height + 'px' : '100%')};
	width: ${(props) => (props.width ? props.width + 'px' : '1px')};
`;

export default Divider;
