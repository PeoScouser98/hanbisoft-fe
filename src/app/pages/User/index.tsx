import LabelButton from '@/common/components/Buttons/LabelButton';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import StyledDataGrid from '@/common/components/StyledDataGrid';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import { getDataChanges, handleExportExcel } from '@/common/utils/dataGridUtils';
import styled from '@emotion/styled';
import { AxiosRequestConfig } from 'axios';
import Button from 'devextreme-react/button';
import { SavedEvent } from 'devextreme/ui/data_grid';
import { confirm } from 'devextreme/ui/dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useGetUserRolesQuery } from '@/app/services/hooks/useAuthQueries';
import { useDeleteUsersMutation, useGetUsersQuery, useUpdateUserMutation } from '@/app/services/hooks/useUserQueries';
import defaultProps from './declarations/defaultProps';

const { columns, ...restProps } = defaultProps;

const searchFields = [
	{
		key: 'display_name',
		component: TextFieldControl,
		localization: 'user:fields.display_name',
		componentProps: {
			name: 'display_name',
			mode: 'search'
		}
	},
	{
		key: 'email',
		component: TextFieldControl,
		localization: 'user:fields.email',
		componentProps: {
			name: 'email',
			mode: 'search'
		}
	},
	{
		key: 'phone',
		component: TextFieldControl,
		localization: 'user:fields.phone',
		componentProps: {
			name: 'phone',
			mode: 'search'
		}
	}
];

const UsersPage: React.FunctionComponent = () => {
	const [searchTerms, setSearchTerms] = React.useState<AxiosRequestConfig['params']>({});
	const { data, isLoading } = useGetUsersQuery(searchTerms);
	const { t } = useTranslation(['common', 'user']);
	const dataGridRef = React.useRef<typeof StyledDataGrid.prototype>(null);
	const [hasEditData, setHasEditData] = React.useState<boolean>(() => dataGridRef.current?.instance?.hasEditData());
	const { control, handleSubmit } = useForm();
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<Array<string>>([]);
	const id = React.useId();
	const { data: roles } = useGetUserRolesQuery();
	const { mutateAsync: updateAsync } = useUpdateUserMutation();
	const { mutateAsync: deleteAsync } = useDeleteUsersMutation();

	const columnsDef = useColumnsDef(
		columns,
		{ ns: 'user', key: 'fields' },
		{
			role: roles?.map((role) => ({
				text: role.role_name.capitalize(),
				value: role._id
			}))
		}
	);

	const handleSave = React.useCallback(async (e: SavedEvent) => {
		const ok = await confirm(
			/* html */ `<i>${t('common:notify.confirm_save_changes')}</i>`,
			t('common:notify.confirm_title')
		);

		if (ok) {
			const { updated, inserted } = getDataChanges(e);
			toast.promise(updateAsync([...updated, ...inserted]), {
				loading: t('common:notify.loading'),
				success: t('common:notify.success'),
				error: t('common:notify.error')
			});
		}
	}, []);

	const handleDelete = async () => {
		const result = await confirm(/* html */ `<i>Are you sure?</i>`, 'Confirm delete');
		if (result === true) {
			toast.promise(async () => await deleteAsync({ _ids: selectedRowKeys.join(',') }), {
				loading: t('notify.loading'),
				success: t('notify.success'),
				error: t('notify.error')
			});
		}
	};

	return (
		<Wrapper>
			<Flex css={{ gap: '4px' }}>
				<LabelButton htmlFor={id} text={t('common:btn.search')} icon='search' />
				<Button
					type='success'
					text={t('common:btn.save')}
					icon='save'
					disabled={!hasEditData}
					onClick={() => dataGridRef.current.instance.saveEditData()}
				/>
				<Button
					type='danger'
					text={t('common:btn.delete')}
					icon='trash'
					disabled={selectedRowKeys.length === 0}
					onClick={handleDelete}
				/>
			</Flex>
			<SearchForm onSubmit={handleSubmit((data) => setSearchTerms(data))}>
				{searchFields.map((item) => (
					<item.component
						key={item.key}
						labelMode='floating'
						height={28}
						control={control}
						label={t(item.localization)}
						{...item.componentProps}
					/>
				))}
				<button id={id} type='submit' />
			</SearchForm>
			<StyledDataGrid
				ref={dataGridRef}
				columns={columnsDef}
				dataSource={data}
				onSaved={handleSave}
				noDataText={t('common:notify.no_data')}
				onSelectedRowKeysChange={setSelectedRowKeys}
				onContentReady={(e) => {
					setHasEditData(e.component.hasEditData());
				}}
				loadPanel={{ enabled: isLoading }}
				onExporting={(e) => handleExportExcel(e.component, 'Users.xlsx')}
				{...restProps}
			/>
		</Wrapper>
	);
};

const Flex = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
const SearchForm = styled.form`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	align-items: center;
	column-gap: 4px;
	row-gap: 8px;
	& > button[type='submit'] {
		display: none;
	}
`;

export default UsersPage;
