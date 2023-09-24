/**
 * @copyright @PeoScouser98
 */

import { NumberBox } from 'devextreme-react';
import { INumberBoxOptions } from 'devextreme-react/number-box';
import React from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';

declare type TNumberFieldProps = { name: string; control: Control<FieldValues> } & INumberBoxOptions;

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

export type { TNumberFieldProps };
export default NumberFieldControl;
