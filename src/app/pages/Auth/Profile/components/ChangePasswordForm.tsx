import { changePasswordSchema } from '@/app/validations/auth.validation';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'devextreme-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useChangePasswordMutation } from '@/app/store/apis/auth.api';
import { toast } from 'sonner';

const ChangePasswordForm = () => {
	const { t } = useTranslation(['common', 'profile']);
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(changePasswordSchema)
	});
	const [mutateAsync] = useChangePasswordMutation();
	const handleChangePassword = (data) => {
		toast.promise(mutateAsync(data), {
			loading: t('commom:notify.saving'),
			success: t('commom:notify.success'),
			error: t('commom:notify.failed')
		});
	};
	return (
		<Form onSubmit={handleSubmit(handleChangePassword)}>
			<TextFieldControl
				control={control}
				name='currentPassword'
				label={t('profile:fields.current_password')}
				labelMode='static'
				mode='password'
			/>
			<TextFieldControl
				control={control}
				name='newPassword'
				label={t('profile:fields.new_password')}
				labelMode='static'
				mode='password'
			/>
			<TextFieldControl
				control={control}
				name='confirmNewPassword'
				label={t('profile:fields.confirm_password')}
				labelMode='static'
				mode='password'
			/>
			<div>
				<Button useSubmitBehavior text={t('btn.save')} icon='save' type='default' />
			</div>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export default ChangePasswordForm;
