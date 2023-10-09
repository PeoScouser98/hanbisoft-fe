import { useUpdateUserInfoMutation } from '@/app/store/apis/auth.api';
import { useAppSelector } from '@/app/store/hook';
import { updateUserSchema } from '@/app/schemas/auth.schema';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'devextreme-react';
import Form, { GroupItem, SimpleItem } from 'devextreme-react/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const editProfileFields = [
	{
		i18nLabelKey: 'user:fields.display_name',
		name: 'display_name',
		key: '1'
	},
	{
		i18nLabelKey: 'user:fields.email',
		name: 'email',
		key: '2'
	},
	{
		i18nLabelKey: 'user:fields.phone',
		name: 'phone',
		key: '3'
	},
	{
		i18nLabelKey: 'user:fields.address',
		name: 'address',
		key: '4'
	}
];

const EditProfileForm = () => {
	const { user } = useAppSelector((state) => state.auth);
	const { control, handleSubmit, reset } = useForm({
		resolver: yupResolver(updateUserSchema),
		defaultValues: user
	});
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const { t } = useTranslation(['common', 'user']);
	const [mutateAsync] = useUpdateUserInfoMutation();

	const handleUpdateUserInfo = (data) => {
		toast.promise(mutateAsync(data), {
			loading: t('common:notify.loading'),
			success: t('common:notify.success'),
			error: t('common:notify.error')
		});
	};

	React.useEffect(() => {
		reset(user);
	}, [isEditing]);

	return (
		<form onSubmit={handleSubmit(handleUpdateUserInfo)}>
			<Form labelLocation='top'>
				<GroupItem colCount={2}>
					{editProfileFields.map((fieldProps) => (
						<SimpleItem
							render={() => (
								<TextFieldControl
									key={fieldProps.name}
									name={fieldProps.name}
									control={control}
									disabled={!isEditing}
									label={t(fieldProps.i18nLabelKey)}
									labelMode='static'
								/>
							)}
						/>
					))}
				</GroupItem>
				<GroupItem>
					{isEditing ? (
						<Button useSubmitBehavior text={t('btn.save')} icon='save' type='success' />
					) : (
						<Button text={t('btn.edit')} type='default' icon='edit' onClick={() => setIsEditing(!isEditing)} />
					)}
				</GroupItem>
			</Form>
		</form>
	);
};

export default React.memo(EditProfileForm);
