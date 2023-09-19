import { RadioGroup } from 'devextreme-react';
import { IRadioGroupOptions } from 'devextreme-react/radio-group';
import { Control, FieldValues, useController } from 'react-hook-form';

declare type TRadioGroupProps = { name: string; control: Control<FieldValues> } & IRadioGroupOptions;

const RadioGroupFieldControl: React.FC<TRadioGroupProps> = (props): React.JSX.Element => {
	const { field, fieldState } = useController({
		control: props.control,
		name: props.name
		// defaultValue: props.defaultValue
	});

	return (
		<RadioGroup
			dataSource={(props.dataSource ??= [])}
			items={props.items}
			ref={(e) => field.ref(e)}
			onValueChange={(value) => field.onChange(value)}
			valueExpr='value'
			displayExpr='text'
			isValid={!fieldState.invalid}
			validationError={fieldState.error}
			{...props}
		/>
	);
};

const defaultProps: Partial<TRadioGroupProps> = {
	validationMessageMode: 'auto',
	validationMessagePosition: 'bottom',
	layout: 'horizontal'
};

RadioGroupFieldControl.defaultProps = defaultProps;

export type { TRadioGroupProps };
export default RadioGroupFieldControl;
