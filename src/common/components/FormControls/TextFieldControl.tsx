/**
 * @copyright PeoScouser98
 */

import useGetFieldControlSize from '@/common/hooks/useGetFieldControlSize';
import type { TTextFieldProps } from '@/types/global';
import { TextBox } from 'devextreme-react';
import React from 'react';
import { useController } from 'react-hook-form';

const TextFieldControl: React.FC<TTextFieldProps> = ({ control, size, ...props }) => {
	const { field, fieldState } = useController({
		control: control,
		name: props.name,
		disabled: props.disabled
	});

	const id = React.useId();
	const height = useGetFieldControlSize(size);

	return (
		<TextBox
			id={id}
			ref={(e) => {
				field.ref(e?.instance);
			}}
			height={height}
			labelMode={props.labelMode || 'static'}
			isValid={!fieldState.invalid}
			validationError={fieldState.error}
			onValueChange={(value) => field.onChange(value)}
			value={field.value}
			{...props}
		/>
	);
};

TextFieldControl.defaultProps = {
	validationMessageMode: 'auto',
	validationMessagePosition: 'bottom',
	valueChangeEvent: 'input',
	size: 'lg',
	showClearButton: true
};

// export type { TTextFieldProps };
export default TextFieldControl;
