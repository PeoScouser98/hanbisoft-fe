import { useUpdateUserInfoMutation } from '@/app/store/apis/auth.api';
import { useAppSelector } from '@/app/store/hook';
import { updateUserSchema } from '@/app/validations/auth.validation';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'devextreme-react';
import { GroupItem } from 'devextreme-react/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const EditProfileForm = () => {
	const { user } = useAppSelector((state) => state.auth);
	const { control, handleSubmit, reset } = useForm({
		resolver: yupResolver(updateUserSchema),
		defaultValues: user
	});
	const { t } = useTranslation(['common', 'profile']);
	const [mutateAsync, states] = useUpdateUserInfoMutation();

	const handleUpdateUserInfo = (data) => {
		toast.promise(mutateAsync(data), {
			loading: t('common:notify.saving'),
			success: t('common:notify.success'),
			error: t('common:notify.failed')
		});
	};

	return (
		<form onSubmit={handleSubmit(handleUpdateUserInfo)}>
			<Form labelLocation='top' colCount={2}>
				<GroupItem>
					<TextFieldControl
						name='displayName'
						control={control}
						label={t('profile:fields.display_name')}
						labelMode='static'
					/>
					<TextFieldControl name='email' control={control} label={t('profile:fields.email')} labelMode='static' />
				</GroupItem>
				<GroupItem>
					<TextFieldControl name='phone' control={control} label={t('profile:fields.phone')} labelMode='static' />
					<TextFieldControl
						name='address'
						control={control}
						label={t('profile:fields.address')}
						labelMode='static'
					/>
				</GroupItem>
				<GroupItem>
					<Button useSubmitBehavior text={t('btn.save')} icon='save' type='default' />
				</GroupItem>
			</Form>
		</form>
	);
};

export default React.memo(EditProfileForm);
