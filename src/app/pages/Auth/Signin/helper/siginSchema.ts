import * as yup from 'yup';

const signinSchema = yup.object({
	email: yup.string().email('Invalid email').required('Please enter your email'),
	password: yup.string().required('Provide your password')
});

export default signinSchema;
