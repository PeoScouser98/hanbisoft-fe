import { newUserSchema } from '@/app/validations/user.validation';
import SelectFieldControl from '@/core/components/FormControls/SelectFieldControl';
import TextFieldControl from '@/core/components/FormControls/TextFieldControl';
import { TRadioGroupProps, TSelectFieldProps, TTextFieldProps } from '@/core/components/FormControls/_type';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileUploader, ProgressBar } from 'devextreme-react';
import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';

import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

const RegisterForm: React.FC<unknown> = () => {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(newUserSchema)
	});

	const formFields: Array<
		(TTextFieldProps | TSelectFieldProps | TRadioGroupProps) & {
			element: React.FC<any>;
		}
	> = [
		{
			name: 'email',
			label: 'Email',
			mode: 'email',
			placeholder: 'example@email.com',
			control,
			element: TextFieldControl
		},
		{
			name: 'firstName',
			label: 'First name',
			control,
			element: TextFieldControl
		},
		{
			name: 'lastName',
			label: 'Last name',
			control,
			element: TextFieldControl
		},

		{
			name: 'age',
			label: 'Age',
			control,
			element: TextFieldControl
		},
		// {
		// 	name: 'gender',
		// 	label: 'Gender',
		// 	control,
		// 	dataSource: [
		// 		{ value: 1, text: 'Male' },
		// 		{ value: 0, text: 'Female' }
		// 	],
		// 	element: RadioGroupFieldControl
		// },
		{
			name: 'role',
			label: 'Role',
			control,
			dataSource: [
				{
					value: 1,
					text: 'Admin'
				},
				{
					value: 0,
					text: 'Member'
				}
			],
			element: SelectFieldControl
		}
	];

	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
			<Form readOnly={true} onFormDataChange={(value) => console.log('form data', value)}>
				<GroupItem colCount={3}>
					<GroupItem colSpan={1}>
						<DropZone>
							<ProgressBar
								id='upload-progress'
								min={0}
								max={100}
								width='30%'
								showStatus={false}
								// visible={progressVisible}
								// value={progressValue}
							/>

							<FileUploader
								height={300}
								style={{ flex: 1 }}
								id='file-uploader'
								dialogTrigger='#dropzone-external'
								dropZone='#dropzone-external'
								multiple={false}
								allowedFileExtensions={allowedFileExtensions}
								uploadMode='instantly'
								uploadUrl='https://static.vecteezy.com/system/resources/previews/004/968/473/non_2x/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg'
								visible={false}
								//  onDropZoneEnter={this.onDropZoneEnter}
								//  onDropZoneLeave={this.onDropZoneLeave}
								//  onUploaded={this.onUploaded}
								//  onProgress={this.onProgress}
								//  onUploadStarted={this.onUploadStarted}
							/>
						</DropZone>
					</GroupItem>
					<GroupItem caption='Information' colSpan={2}>
						{formFields.map((props) => (
							<SimpleItem
								key={props.name}
								render={() => {
									const { element, ...rest } = props;
									return <props.element {...rest} />;
								}}
							/>
						))}
					</GroupItem>
				</GroupItem>

				<ButtonItem
					horizontalAlignment='left'
					itemType='button'
					visible
					buttonOptions={{ icon: 'save', text: 'Save', useSubmitBehavior: true, type: 'default' }}
				/>
			</Form>
		</form>
	);
};

const DropZone = styled.div.attrs({ className: 'dx-theme-border-color' })`
	border-width: 4px;
	border-style: dashed;
	display: flex;
	flex-direction: column;
	gap: 16px;
	/* min-height: 300px; */
	align-self: stretch;
`;

export default RegisterForm;
