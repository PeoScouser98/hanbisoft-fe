import styled from '@emotion/styled';
import React, { useId } from 'react';

type TSwapButtonProps = React.ClassAttributes<HTMLLabelElement> &
	React.LabelHTMLAttributes<HTMLLabelElement> & {
		checked?: boolean;
		onChange?: (...params) => unknown;
		swapOn: React.ReactNode;
		swapOff: React.ReactNode;
	};

const Swap = React.forwardRef<React.Ref<HTMLInputElement>, TSwapButtonProps>((props: TSwapButtonProps, ref) => {
	const id = useId();
	const localRef = React.useRef(null);
	const resolvedRef = (ref || localRef) as React.MutableRefObject<any>;

	return (
		<SwapButton
			id={props.id || crypto.randomUUID()}
			htmlFor={id}
			className={'dx-widget dx-button dx-button-mode-text'}
			onMouseEnter={(e) => {
				e.currentTarget.classList.add('dx-state-hover');
				if (props.onMouseEnter) props.onMouseEnter(e);
			}}
			onMouseLeave={(e) => {
				e.currentTarget.classList.remove('dx-state-hover');
				if (props.onMouseLeave) props.onMouseLeave(e);
			}}>
			<ButtonToggler
				id={id}
				type='checkbox'
				checked={props.checked}
				ref={resolvedRef}
				onChange={(e) => {
					if (props.onChange) props.onChange(e);
				}}
			/>
			<ButtonLabel className='swap-on'>{props.swapOn}</ButtonLabel>
			<ButtonLabel className='swap-off'>{props.swapOff}</ButtonLabel>
		</SwapButton>
	);
});
const SwapButton = styled.label`
	cursor: pointer;
	position: relative;
	display: inline-grid;
	place-content: center;
	user-select: none;
	padding: 4px;
	width: 32px;
	height: 32px;
	& > * {
		vertical-align: middle;
		grid-column-start: 1;
		grid-row-start: 1;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-property: transform, opacity;
	}
	& .swap-on,
	& input[type='checkbox']:indeterminate ~ .swap-on {
		opacity: 0;
	}

	& .swap-off,
	& input[type='checkbox'] ~ .swap-off {
		opacity: 1;
	}

	& input[type='checkbox']:checked ~ .swap-on {
		opacity: 1;
		transform: rotate(-45deg);
	}
	& input[type='checkbox']:checked ~ .swap-off {
		opacity: 0;
		transform: rotate(-45deg);
	}
`;

const ButtonToggler = styled.input`
	appearance: none;
	position: absolute;
	inset: 0;
`;
const ButtonLabel = styled.div`
	cursor: pointer;
	user-select: none;
	line-height: 0;
	font-size: 16px;
`;

export default Swap;
