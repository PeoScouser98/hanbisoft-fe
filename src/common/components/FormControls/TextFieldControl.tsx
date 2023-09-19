import { TextBox } from 'devextreme-react';
import { ITextBoxOptions } from 'devextreme-react/text-box';
import React from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';

declare type TTextFieldProps = { name: string; control: Control<FieldValues> } & ITextBoxOptions;

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
			labelMode='floating'
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

export type { TTextFieldProps };
export default TextFieldControl;
