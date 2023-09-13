import { SelectBox } from 'devextreme-react';
import { useController } from 'react-hook-form';
import type { TSelectFieldProps } from './_type';
import React from 'react';

const SelectFieldControl: React.FC<TSelectFieldProps> = (props): React.JSX.Element => {
	const { fieldState, field } = useController({
		control: props.control,
		name: props.name,
		disabled: props.disabled
	});

	return (
		<SelectBox
			displayExpr='text'
			valueExpr='value'
			dataSource={props.dataSource}
			ref={(e) => {
				field.ref(e?.instance);
			}}
			isValid={!fieldState.invalid}
			onValueChange={(value) => field.onChange(value)}
			validationError={fieldState.error}
			{...props}
		/>
	);
};

export default SelectFieldControl;
