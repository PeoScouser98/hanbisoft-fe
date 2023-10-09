import * as yup from 'yup';

export const siteSettingSchema = yup.object({
	site_name: yup.string().required(),
	logo: yup.mixed().required(),
	email: yup.string().email().required(),
	address: yup.string().required(),
	phone: yup.string().required()
});
