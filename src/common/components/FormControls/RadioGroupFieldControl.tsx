import type { TRadioGroupProps } from '@/types/global';
import { RadioGroup } from 'devextreme-react';
import { useController } from 'react-hook-form';

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
