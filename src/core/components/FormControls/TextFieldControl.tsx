import { TextBox } from 'devextreme-react';
import { TextBoxType } from 'devextreme/ui/text_box';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface TextFieldProps {
	type: TextBoxType;
	control: Control<any>;
	name: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
}

export default function TextFieldControl(props: TextFieldProps) {
	const { field, fieldState } = useController({
		control: props.control,
		name: props.name,
		disabled: props.disabled
	});

	const id = React.useId();

	return (
		<TextBox
			id={id}
			name={props.name}
			disabled={props.disabled}
			label={props.label}
			mode={props.type}
			placeholder={props.placeholder}
			ref={(e) => {
				field.ref(e?.instance);
			}}
			style={{ backgroundColor: 'inherit' }}
			isValid={!fieldState.error}
			valueChangeEvent='input'
			validationError={fieldState.error}
			validationMessageMode='auto'
			validationMessagePosition='bottom'
			onValueChange={(value) => field.onChange(value)}
			value={field.value}
		/>
	);
}
