import { NumberBox } from 'devextreme-react';
import React from 'react';
import { useController } from 'react-hook-form';
import type { TNumberFieldProps } from './_type';

const NumberFieldControl: React.FC<TNumberFieldProps> = (props): React.JSX.Element => {
	const { field, fieldState } = useController({
		control: props.control,
		name: props.name,
		disabled: props.disabled
	});

	const id = React.useId();
	return (
		<NumberBox
			id={id}
			ref={(e) => {
				field.ref(e?.instance);
			}}
			onValueChange={(value) => field.onChange(value)}
			isValid={!fieldState.invalid}
			validationError={fieldState.error}
			value={field.value}
			{...props}
		/>
	);
};

NumberFieldControl.defaultProps = {
	validationMessageMode: 'auto',
	validationMessagePosition: 'bottom',
	valueChangeEvent: 'input'
};

export default NumberFieldControl;
