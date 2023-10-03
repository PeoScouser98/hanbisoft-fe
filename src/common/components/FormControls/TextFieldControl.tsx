import type { TTextFieldProps } from '@/types/global';
import { TextBox } from 'devextreme-react';
import React from 'react';
import { useController } from 'react-hook-form';

const TextFieldControl: React.FC<TTextFieldProps> = (props) => {
	const { field, fieldState } = useController({
		control: props.control,
		name: props.name,
		disabled: props.disabled
	});

	const id = React.useId();
	return (
		<TextBox
			id={id}
			ref={(e) => {
				field.ref(e?.instance);
			}}
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
	height: 28,
	showClearButton: true
};

// export type { TTextFieldProps };
export default TextFieldControl;
