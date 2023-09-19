import React from 'react';
import { SelectBox } from 'devextreme-react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { ISelectBoxOptions } from 'devextreme-react/select-box';

declare type TSelectFieldProps = { name: string; control: Control<FieldValues> } & ISelectBoxOptions;

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

export type { TSelectFieldProps };
export default SelectFieldControl;
