import * as yup from 'yup';

export const signinSchema = yup.object({
	email: yup.string().email('Invalid email').required('Please enter your email'),
	password: yup.string().required('Provide your password')
});

export const updateUserSchema = yup.object({
	display_name: yup.string().required('Provide a display name'),
	phone: yup.string().required('Provide a phone number'),
	email: yup.string().email('Invalid email').required('Provide an email'),
	address: yup.string().required('Provide an address')
});

export const changePasswordSchema = yup.object({
	currentPassword: yup.string().required('Enter current password'),
	newPassword: yup.string().min(6, 'Password has at least 6 characters').required('Provide a new password'),
	confirmNewPassword: yup
		.string()
		.test('matchValue', 'Confirm password must match', function (value) {
			return value === this.parent.newPassword;
		})
		.required(`Password is required`)
});
