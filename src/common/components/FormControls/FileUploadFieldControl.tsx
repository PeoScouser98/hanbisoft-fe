/**
 * @copyright PeoScouser98
 */

import React from 'react';
import { TFileUploadFieldProps } from '@/types/global';
import { FileUploader } from 'devextreme-react';
import { useController } from 'react-hook-form';
import Typography from '../Typography';

const FileUploadFieldControl = ({
	control,
	name,
	label,
	disabled,
	allowedFileExtensions,
	...restProps
}: TFileUploadFieldProps) => {
	const { field, fieldState } = useController({
		control,
		name,
		disabled
	});

	return (
		<React.Fragment>
			<FileUploader
				{...restProps}
				stylingMode='filled'
				onValueChange={(value) => field.onChange(value)}
				isValid={!fieldState.invalid}
				validationError={fieldState.error}
			/>

			{allowedFileExtensions && <Typography variant='p'></Typography>}
		</React.Fragment>
	);
};

FileUploadFieldControl.defaultProps = {
	uploadMode: 'useForm',
	uploadMethod: 'POST',
	selectButtonText: 'Choose a file'
};

export default React.memo(FileUploadFieldControl);
