import { UserRoleEnum } from '@/common/constants/user.const';
import * as yup from 'yup';

const availableRoleValues = <number[]>Object.values(UserRoleEnum);

export const newUserSchema = yup.object({
	email: yup.string().email('Invalid email').required('Provide a valid email'),
	password: yup.string().min(6).max(16).required(),
	age: yup.number().min(1).required('Age is required'),
	confirmPassword: yup
		.string()
		.test('matchValue', 'Confirm password must match', function (value) {
			return value === this.parent.password;
		})
		.required(`Password is required`),
	displayName: yup.string().min(3).required(`Provide user's name`),
	address: yup.string().required(`Provide users's address`),
	gender: yup.string().required(`Please select user's gender`),
	role: yup.number().oneOf(availableRoleValues).required('Please select role to apply for user')
});
