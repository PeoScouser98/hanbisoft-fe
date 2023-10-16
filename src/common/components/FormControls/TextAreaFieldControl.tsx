/**
 * @copyright PeoScouser98
 */

import React from 'react';
import useGetFieldControlSize from '@/common/hooks/useGetFieldControlSize';
import { TTextAreaFieldProps } from '@/types/global';
import { TextArea } from 'devextreme-react';
import { useController } from 'react-hook-form';

const TextAreaFieldControl: React.FC<TTextAreaFieldProps> = ({ control, name, disabled, size, ...props }) => {
	const { field, fieldState } = useController({
		name,
		control,
		defaultValue: props.defaultValue
	});
	const height = useGetFieldControlSize(props.size);

	return (
		<TextArea
			name={props.name}
			height={height}
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
	autoResizeEnabled: true,
	height: 28
};

export type { TTextAreaFieldProps };
export default React.memo(TextAreaFieldControl);
