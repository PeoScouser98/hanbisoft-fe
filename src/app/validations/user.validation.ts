import { UserRoleEnum } from '@/core/constants/user.const';
import * as yup from 'yup';

const availableRoleValues = <number[]>Object.values(UserRoleEnum);

export const newUserSchema = yup.object({
	email: yup.string().email('Invalid email').required('Provide a valid email'),
	password: yup.string().min(6).max(16).required(),
	displayName: yup.string().min(3).required(),
	role: yup.number().oneOf(availableRoleValues).required('Please select role to apply for user')
});
