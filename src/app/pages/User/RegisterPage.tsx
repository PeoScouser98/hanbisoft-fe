import { useCreateUsersMutation } from '@/app/store/api/userApi';
import { newUserSchema } from '@/app/validations/user.validation';
import RadioGroupFieldControl, { TRadioGroupProps } from '@/common/components/FormControls/RadioGroupFieldControl';
import SelectFieldControl, { TSelectFieldProps } from '@/common/components/FormControls/SelectFieldControl';
import TextAreaFieldControl from '@/common/components/FormControls/TextAreaFieldControl';
import TextFieldControl, { TTextFieldProps } from '@/common/components/FormControls/TextFieldControl';

import { yupResolver } from '@hookform/resolvers/yup';
import Form, { ButtonItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// const allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

const RegisterForm: React.FC<unknown> = () => {
	const { handleSubmit, control, reset } = useForm({
		resolver: yupResolver(newUserSchema)
	});

	const [handleCreateUser, isLoading] = useCreateUsersMutation();

	const formFields: Array<
		(TTextFieldProps | TSelectFieldProps | TRadioGroupProps) & {
			element: React.FC<any>;
		}
	> = [
		{
			name: 'email',
			label: 'Email',
			mode: 'email',
			control,
			element: TextFieldControl
		},
		{
			name: 'password',
			label: 'Password',
			mode: 'password',
			control,
			element: TextFieldControl
		},
		{
			name: 'confirmPassword',
			label: 'Confirm password',
			mode: 'password',
			control,
			element: TextFieldControl
		},
		{
			name: 'displayName',
			label: `User's name`,
			control,
			element: TextFieldControl
		},
		{
			name: 'age',
			label: 'Age',
			control,
			element: TextFieldControl
		},
		{
			name: 'gender',
			label: 'Gender',
			control,
			dataSource: [
				{ value: 1, text: 'Male' },
				{ value: 0, text: 'Female' }
			],
			element: RadioGroupFieldControl
		},
		{
			name: 'address',
			label: 'Address',
			control,
			element: TextAreaFieldControl
		},
		{
			name: 'role',
			label: 'Role',
			control,
			placeholder: '',
			dataSource: [
				{ value: '', text: 'Select a role', disabled: true },
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

	const createUser = async (data) => {
		const { confirmPassword, ...payload } = data;
		await handleCreateUser(payload);
		toast.success('Created new user!');
		reset();
	};

	return (
		<form onSubmit={handleSubmit(createUser)}>
			<Form readOnly={true} onFormDataChange={(value) => console.log('form data', value)}>
				<GroupItem colCount={2} caption='Create new user account'>
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

// const DropZone = styled.div.attrs({ className: 'dx-theme-border-color' })`
// 	border-width: 4px;
// 	border-style: dashed;
// 	display: flex;
// 	flex-direction: column;
// 	gap: 16px;
// 	/* min-height: 300px; */
// 	align-self: stretch;
// `;

export default RegisterForm;
