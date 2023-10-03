import SelectFieldControl from '@/common/components/FormControls/SelectFieldControl';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import StyledDataGrid from '@/common/components/StyledDataGrid';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import useDebounce from '@/common/hooks/useDebounce';
import useScreenSize from '@/common/hooks/useScreenSize';
import { handleExportExcel } from '@/common/utils/dataGridUtils';
import { SearchOutlined } from '@mui/icons-material';
import { AxiosRequestConfig } from 'axios';
import { Button, ScrollView } from 'devextreme-react';
import { IButtonOptions } from 'devextreme-react/button';
import { ContentReadyEvent, SavedEvent } from 'devextreme/ui/data_grid';
import { confirm } from 'devextreme/ui/dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ButtonGroup, Container, SearchBox, SearchSubmitLabel } from './components/Styled';
import defaultProps, { searchFields } from './defaultProps';
import useDeleteEquipmentsMutation from './hooks/useDeleteEquipmentMutation';
import useGetEquipmentQuery from './hooks/useGetEquipmentQuery';
import useGetLookupFieldsQuery from './hooks/useGetLookupFieldsQuery';
import useSaveEquipmentsMutation from './hooks/useSaveEquipmentMutation';

const { columns, ...restProps } = defaultProps;

const EquipmentList: React.FunctionComponent = () => {
	const { t, i18n } = useTranslation(['common', 'equipment']);
	const { control, handleSubmit } = useForm();
	const id = React.useId();
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<Array<string>>([]);
	const screenSize = useScreenSize();
	const [searchTerms, setSearchTerms] = React.useState<AxiosRequestConfig['params']>();
	const { data: lookupFields, isFetching: isFetchingLookupValues } = useGetLookupFieldsQuery();
	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetEquipmentQuery(searchTerms);
	const columnsDef = useColumnsDef(columns, { ns: 'equipment' }, lookupFields);
	const { mutateAsync: deleteAsync } = useDeleteEquipmentsMutation();
	const { mutateAsync: saveAsync, isLoading: isSaving } = useSaveEquipmentsMutation();
	const lazyFetchNextPage = useDebounce(fetchNextPage, 100);
	const dataGridRef = React.useRef<typeof StyledDataGrid.prototype>(null);
	const [hasEditedData, setHasEditedData] = React.useState<boolean>(() => dataGridRef.current?.instance.hasEditData());
	const dataGridHeight = React.useMemo<number>(() => screenSize.height - 254, [screenSize.height]);

	const actionButtonsGroup = React.useMemo<IButtonOptions[]>(
		() => [
			{
				key: 'search',
				component: () => (
					<SearchSubmitLabel htmlFor={id}>
						<SearchOutlined /> {t('common:btn.search')}
					</SearchSubmitLabel>
				),
				icon: 'search',
				type: 'default',
				text: t('common:btn.search')
			},
			{
				key: 'save',
				icon: 'save',
				text: t('common:btn.save'),
				type: 'success',
				disabled: isSaving || !hasEditedData,
				onClick: () => dataGridRef.current.instance?.saveEditData()
			},
			{
				key: 'delete',
				icon: 'trash',
				text: t('common:btn.delete'),
				type: 'danger',
				disabled: selectedRowKeys.length === 0,
				onClick: () => handleDelete()
			}
		],
		[selectedRowKeys, i18n.language, t, hasEditedData]
	);

	const handleSearch = (data) => {
		const searchParams = {};
		Object.keys(data).forEach((key) => {
			if (data[key]) searchParams[key] = data[key];
		});
		setSearchTerms(searchParams);
	};

	const handleSave = async (e: SavedEvent) => {
		const result = await confirm(/* html */ `<i>Accept those changes?</i>`, 'Confirm changes');
		if (result) {
			toast.promise(saveAsync(e.changes), {
				loading: t('notify.loading'),
				success: t('notify.success'),
				error: t('notify.error')
			});
		}
		return result;
	};

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

	const handleScrollToBottom = async (e: ContentReadyEvent) => {
		e.component.getScrollable().on('scroll', function ({ reachedBottom }) {
			if (reachedBottom) this.off('scroll');
			const canFetchNextPage = reachedBottom && isFetchingNextPage === false && hasNextPage;
			if (canFetchNextPage) {
				lazyFetchNextPage();
			}
		});
	};

	return (
		<Container>
			<ButtonGroup>
				{actionButtonsGroup.map((props) => (
					<Button {...props} />
				))}
			</ButtonGroup>
			<ScrollView>
				<SearchBox onSubmit={handleSubmit(handleSearch)}>
					{searchFields.map((options) => {
						const { type, name, i18nKey, ...rest } = options;
						if (type === 'Select')
							return (
								<SelectFieldControl
									control={control}
									dataSource={lookupFields[name]}
									label={t(i18nKey)}
									name={name}
									disabled={isFetchingLookupValues}
									labelMode='floating'
									placeholder=''
									showClearButton
									{...rest}
								/>
							);
						return (
							<TextFieldControl
								showClearButton
								mode='search'
								control={control}
								labelMode='floating'
								label={t(i18nKey)}
								name={name}
								{...rest}
							/>
						);
					})}
					<button type='submit' id={id} />
				</SearchBox>
			</ScrollView>

			<StyledDataGrid
				ref={dataGridRef}
				height={dataGridHeight}
				columns={columnsDef}
				dataSource={data.pages.flat()}
				loadPanel={{ enabled: isLoading || isFetchingNextPage }}
				onContentReady={(e) => {
					setHasEditedData(e.component.hasEditData());
					handleScrollToBottom(e);
				}}
				onSaved={handleSave}
				noDataText={t('common:notify.no_data')}
				onSelectedRowKeysChange={setSelectedRowKeys}
				onExporting={(e) => handleExportExcel(e.component, 'Equipments list.xlsx')}
				{...restProps}
			/>
		</Container>
	);
};

export default EquipmentList;
