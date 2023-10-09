import React from 'react';
import Button from 'devextreme-react/button';
import ScrollView from 'devextreme-react/scroll-view';
import { ContentReadyEvent, SavedEvent } from 'devextreme/ui/data_grid';
import { confirm } from 'devextreme/ui/dialog';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import ButtonList, { TButtonListProps } from '@/common/components/Buttons/ButtonGroup';
import LabelButton from '@/common/components/Buttons/LabelButton';
import SelectFieldControl from '@/common/components/FormControls/SelectFieldControl';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import StyledDataGrid from '@/common/components/StyledDataGrid';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import useDebounce from '@/common/hooks/useDebounce';
import useScreenSize from '@/common/hooks/useScreenSize';
import { handleExportExcel } from '@/common/utils/dataGridUtils';
import { Container, SearchBox } from './components/Styled';
import defaultProps, { searchFields } from './declarations/defaultProps';
import {
	useDeleteEquipmentsMutation,
	useGetEquipmentsQuery,
	useGetLookupFieldsQuery,
	useSaveEquipmentsMutation
} from '@/app/services/hooks/useEquipmentQueries';

const { columns, ...restProps } = defaultProps;

const EquipmentList: React.FunctionComponent = () => {
	const { t, i18n } = useTranslation(['common', 'equipment']);
	const { control, handleSubmit } = useForm();
	const id = React.useId();
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<Array<string>>([]);
	const screenSize = useScreenSize();
	const [searchTerms, setSearchTerms] = React.useState<string>();
	const { data: lookupFields, isLoading: isLoadingLookupValues } = useGetLookupFieldsQuery();
	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetEquipmentsQuery(searchTerms);
	const columnsDef = useColumnsDef(columns, { ns: 'equipment' }, lookupFields);
	const { mutateAsync: deleteAsync } = useDeleteEquipmentsMutation();
	const { mutateAsync: saveAsync, isLoading: isSaving } = useSaveEquipmentsMutation();
	const dataGridRef = React.useRef<typeof StyledDataGrid.prototype>(null);
	const [hasEditedData, setHasEditedData] = React.useState<boolean>(() => dataGridRef.current?.instance.hasEditData());
	const dataGridHeight = React.useMemo<number>(() => screenSize.height - 260, [screenSize.height]);
	const lazyFetchNextPage = useDebounce((e) => {
		if (e.reachedBottom && hasNextPage) {
			fetchNextPage();
		}
	}, 200);
	const actionButtonsGroup: TButtonListProps['items'] = React.useMemo(
		() => [
			{
				component: LabelButton,
				props: {
					htmlFor: id,
					icon: 'search',
					text: t('common:btn.search'),
					type: 'default'
				}
			},
			{
				component: Button,
				props: {
					icon: 'save',
					text: t('common:btn.save'),
					type: 'success',
					disabled: isSaving || !hasEditedData,
					onClick: () => dataGridRef.current.instance?.saveEditData()
				}
			},
			{
				component: Button,
				props: {
					icon: 'trash',
					text: t('common:btn.delete'),
					type: 'danger',
					disabled: selectedRowKeys.length === 0,
					onClick: () => handleDelete()
				}
			}
		],
		[selectedRowKeys, i18n.language, t, hasEditedData]
	);

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

	const handleDelete = React.useCallback(async () => {
		const result = await confirm(/* html */ `<i>Are you sure?</i>`, 'Confirm delete');
		if (result === true) {
			toast.promise(async () => await deleteAsync({ _ids: selectedRowKeys.join(',') }), {
				loading: t('notify.loading'),
				success: t('notify.success'),
				error: t('notify.error')
			});
		}
	}, []);

	const handleScrollToBottom = React.useCallback(async (e: ContentReadyEvent) => {
		e.component.getScrollable().on('scroll', lazyFetchNextPage);
	}, []);

	return (
		<Container>
			<ButtonList items={actionButtonsGroup} />

			<ScrollView direction='horizontal'>
				<SearchBox onSubmit={handleSubmit((data) => setSearchTerms(data))}>
					{searchFields.map((options) => {
						const { type, name, i18nKey, ...rest } = options;
						if (type === 'Select')
							return (
								<SelectFieldControl
									control={control}
									dataSource={lookupFields[name]}
									label={t(i18nKey)}
									name={name}
									disabled={isLoadingLookupValues}
									labelMode='floating'
									searchEnabled
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
				dataSource={data?.pages?.flat()}
				loadPanel={{ enabled: isLoading || isFetchingNextPage || isLoadingLookupValues }}
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
