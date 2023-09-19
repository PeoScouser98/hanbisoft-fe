import { TextArea } from 'devextreme-react';
import { ITextAreaOptions } from 'devextreme-react/text-area';
import { Control, FieldValues, useController } from 'react-hook-form';

declare type TTextAreaFieldProps = { name: string; control: Control<FieldValues> } & ITextAreaOptions;

const TextAreaFieldControl: React.FC<TTextAreaFieldProps> = (props) => {
	const { field, fieldState } = useController({
		name: props.name,
		control: props.control,
		defaultValue: props.defaultValue
	});
	console.log(fieldState.error);

	return (
		<TextArea
			name={props.name}
			onValueChange={(value) => field.onChange(value)}
			ref={(e) => field.ref(e?.instance)}
			validationError={fieldState.error}
			isValid={!fieldState.invalid}
			value={field.value}
			validationMessageMode='auto'
			{...props}
		/>
	);
};

TextAreaFieldControl.defaultProps = {
	validationMessagePosition: 'bottom',
	valueChangeEvent: 'input',
	autoResizeEnabled: true
};

export type { TTextAreaFieldProps };
export default TextAreaFieldControl;
