/**
 * @copyright PeoScouser98
 */

import useGetFieldControlSize from '@/common/hooks/useGetFieldControlSize';
import type { TSelectFieldProps } from '@/types/global';
import { SelectBox } from 'devextreme-react';
import React from 'react';
import { useController } from 'react-hook-form';

const SelectFieldControl: React.FC<TSelectFieldProps> = (props): React.JSX.Element => {
	const { fieldState, field } = useController({
		control: props.control,
		name: props.name,
		disabled: props.disabled
	});
	const height = useGetFieldControlSize(props.size);
	return (
		<SelectBox
			displayExpr='text'
			valueExpr='value'
			dataSource={props.dataSource}
			ref={(e) => {
				field.ref(e?.instance);
			}}
			searchEnabled={props.searchEnabled}
			height={height}
			isValid={!fieldState.invalid}
			onValueChange={(value) => field.onChange(value)}
			validationError={fieldState.error}
			{...props}
		/>
	);
};

SelectFieldControl.defaultProps = {
	showClearButton: true,
	height: 28,
	labelMode: 'static',
	validationMessageMode: 'auto',
	searchEnabled: true
};

export default SelectFieldControl;
