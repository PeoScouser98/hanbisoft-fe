import React from 'react';
import Form, { Item } from 'devextreme-react/form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirm } from 'devextreme/ui/dialog';
import { siteSettingSchema } from '@/app/schemas/site_setting.schema';
import FileUploadFieldControl from '@/common/components/FormControls/FileUploadFieldControl';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import { useUpdateSiteSettingMutation } from '@/app/services/hooks/useSiteSettingQueries';

const form = [
	{
		locale: 'system_settings:captions.general_settings',
		items: [
			{
				component: TextFieldControl,
				locale: 'system_settings:fields.site_name',
				props: {
					name: 'site_name',
					labelMode: 'floating'
				}
			},
			{
				component: FileUploadFieldControl,
				locale: 'system_settings:fields.logo',
				props: {
					label: 'Logo',
					selectButtonText: 'Choose a logo',
					name: 'logo'
				}
			}
		]
	},
	{
		locale: 'system_settings:captions.contact',
		items: [
			{
				component: TextFieldControl,
				locale: 'user:fields.email',
				props: {
					name: 'email',
					labelMode: 'floating'
				}
			},
			{
				component: TextFieldControl,
				locale: 'user:fields.phone',
				props: {
					name: 'phone',
					labelMode: 'floating'
				}
			},
			{
				component: TextFieldControl,
				locale: 'user:fields.address',
				props: {
					name: 'address',
					labelMode: 'floating'
				}
			}
		]
	}
];

const SiteSettingFormPanel: React.FunctionComponent = () => {
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(siteSettingSchema),
		defaultValues: {}
	});
	const { mutateAsync } = useUpdateSiteSettingMutation();
	const { t } = useTranslation(['user', 'system_settings', 'common']);

	const handleSaveSettings = async (data) => {
		const result = await confirm(/* html */ `<i>Accept those changes?</i>`, 'Confirm changes');
		if (result) {
			const formData = new FormData();
			const { logo, ...rest } = data;
			formData.append('logo', logo[0]);
			Object.keys(rest).forEach((name) => {
				formData.append(name, rest[name]);
			});
			toast.promise(mutateAsync(formData), {
				loading: t('common:notify.loading'),
				success: t('common:notify.success'),
				error: t('common:notify.error')
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(handleSaveSettings)} encType='multipart/form-data'>
			<Form>
				<Item colCount={2} itemType='group' badge='hello'>
					{form.map((groupItem) => (
						<Item itemType='group' key={crypto.randomUUID()} caption={t(groupItem.locale)}>
							{groupItem.items.map((field) => {
								const { component: FormField, props } = field;
								return (
									<Item
										key={crypto.randomUUID()}
										caption={t(field.locale)}
										itemType='simple'
										horizontalAlignment='center'
										verticalAlignment='center'
										render={() => <FormField {...props} label={t(field.locale)} control={control} />}
									/>
								);
							})}
						</Item>
					))}
				</Item>
				<Item itemType='group'>
					<Item
						itemType='button'
						buttonOptions={{
							useSubmitBehavior: true,
							text: t('common:btn.save'),
							icon: 'save',
							type: 'default',
							focusStateEnabled: false,
							height: 28
						}}
					/>
				</Item>
			</Form>
		</form>
	);
};

export default SiteSettingFormPanel;
