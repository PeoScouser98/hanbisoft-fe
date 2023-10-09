import clsx from 'clsx';
import { TDxIcon } from 'devextreme';
import React from 'react';
import DxIcon from '../DxIcon';
import { IButtonOptions } from 'devextreme-react/button';
import { Interpolation } from '@emotion/react';
import { Theme } from '@emotion/react';

declare type TLabelButtonProps = React.ClassAttributes<HTMLLabelElement> &
	React.LabelHTMLAttributes<HTMLLabelElement> &
	IButtonOptions & {
		css?: Interpolation<Theme>;
		icon: TDxIcon;
	};

const LabelButton: React.FC<TLabelButtonProps> = (props) => {
	const className = clsx('dx-widget dx-button', {
		'dx-button-mode-contained': props.stylingMode === 'contained' || !props.stylingMode,
		'dx-button-mode-text': props.stylingMode === 'text',
		'dx-button-mode-outlined': props.stylingMode === 'outlined',
		'dx-button-default': props.type === 'default' || !props.type,
		'dx-button-danger': props.type === 'danger',
		'dx-button-normal': props.type === 'normal',
		'dx-button-success': props.type === 'success',
		'dx-button-back': props.type === 'back',
		'dx-button-has-text': !!props.text,
		'dx-button-has-icon': !!props.icon
	});

	return (
		<label
			role='button'
			aria-label={props.text}
			onMouseEnter={(e) => {
				e.currentTarget.classList.add('dx-state-hover');
				if (props.onMouseEnter) props.onMouseEnter(e);
			}}
			onMouseLeave={(e) => {
				e.currentTarget.classList.remove('dx-state-hover');
				if (props.onMouseLeave) props.onMouseLeave(e);
			}}
			onMouseDown={(e) => {
				e.currentTarget.classList.add('dx-state-focused', 'dx-state-active');
			}}
			onMouseUp={(e) => {
				e.currentTarget.classList.remove('dx-state-focused', 'dx-state-active');
			}}
			className={className}
			htmlFor={props.htmlFor}
			tabIndex={0}>
			<div className='dx-button-content'>
				{props.icon && <DxIcon type={props.icon as TDxIcon} />}
				<span className='dx-button-text'>{props.text}</span>
			</div>
		</label>
	);
};

export type { TLabelButtonProps };
export default LabelButton;
