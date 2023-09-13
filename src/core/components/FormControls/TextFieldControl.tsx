import React from 'react';
import { TextBox } from 'devextreme-react';
import { useController } from 'react-hook-form';
import type { TTextFieldProps } from './_type';

const TextFieldControl: React.FC<TTextFieldProps> = (props): React.JSX.Element => {
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
	valueChangeEvent: 'input'
};

export default TextFieldControl;
