import React from 'react';
import ErrorBoundary from '@/common/components/ErrorBoundary';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import useScreenSize from '@/common/hooks/useScreenSize';
import handleExportExcel from '@/common/utils/exportExcel';
import { SearchOutlined } from '@mui/icons-material';
import { AxiosRequestConfig } from 'axios';
import { Button, DataGrid, ScrollView } from 'devextreme-react';
import { IButtonOptions } from 'devextreme-react/button';
import { Column } from 'devextreme-react/data-grid';
import { SavedEvent } from 'devextreme/ui/data_grid';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import predefine, { columns } from './_predefine';
import { ButtonGroup, Container, SearchBox, SearchSubmitLabel, StyledDataGrid } from './components/Styled';
import useDeleteEquipmentsMutation from './hooks/useDeleteEquipmentMutation';
import useGetEquipmentQuery from './hooks/useGetEquipmentQuery';
import useSaveEquipmentsMutation from './hooks/useSaveEquipmentMutation';
import qs from 'qs';
import useGetLookupFieldsQuery from './hooks/useGetLookupFieldsQuery';
import useDXTheme from '@/common/hooks/useDXTheme';

const EquipmentList = () => {
	const { t } = useTranslation(['common', 'equipment']);
	const { control, handleSubmit } = useForm();
	const id = React.useId();
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<Array<string>>([]);
	const columnsDef = useColumnsDef(columns, { ns: 'equipment' });
	const screenSize = useScreenSize();
	const [searchTerms, setSearchTerms] = React.useState<string>('');
	const { data, isFetching, refetch } = useGetEquipmentQuery(searchTerms);
	const { data: lookupFields, refetch: refetchLookupFields } = useGetLookupFieldsQuery();
	const { mutateAsync: deleteAsync } = useDeleteEquipmentsMutation();
	const { mutateAsync: saveAsync } = useSaveEquipmentsMutation();
	const { currentTheme } = useDXTheme();
	const dataGridRef = React.useRef<typeof DataGrid.prototype>(null);
	const dtgr_height = React.useMemo<number>(() => screenSize.height - 286, [screenSize.height]);
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
				onClick: function () {
					if (confirm('Aggree to save data?')) dataGridRef.current.instance?.saveEditData();
				}
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
		[selectedRowKeys]
	);

	React.useEffect(() => {
		refetch({ exact: true, queryKey: ['equipment', searchTerms] });
	}, [searchTerms]);

	React.useEffect(() => {
		refetchLookupFields();
	}, []);

	const handleSearch = (data) => {
		const searchTermsVal = {};
		Object.keys(data).forEach((key) => {
			if (data[key]) searchTermsVal[key] = data[key];
		});
		const searchParams = !!searchTermsVal ? '?' + qs.stringify(searchTermsVal) : '';
		setSearchTerms(searchParams);
	};

	const handleSave = async (e: SavedEvent) => {
		toast.promise(saveAsync(e.changes), {
			loading: t('notify.saving'),
			success: t('notify.success'),
			error: t('notify.failed')
		});
	};

	const handleDelete = async () => {
		if (confirm('Aggree to delete data?')) {
			toast.promise(async () => await deleteAsync({ _ids: selectedRowKeys.join(',') }), {
				loading: t('notify.saving'),
				success: t('notify.success'),
				error: t('notify.failed')
			});
		}
	};

	// const handleScrollToBottom = async (e: ContentReadyEvent) => {
	// 	e.component.getScrollable().on('scroll', function (e) {
	// 		if (e.reachedBottom) {
	// 			console.log('bottom reached');
	// 		}
	// 	});
	// };

	return (
		<Container>
			<ButtonGroup>
				{actionButtonsGroup.map((props) => (
					<Button {...props} />
				))}
			</ButtonGroup>
			<ScrollView>
				<SearchBox
					onSubmit={handleSubmit(handleSearch)}
					className='dx-theme-border-color-as-background-color dx-theme-border-color'>
					{predefine.searchFields.map((options) => {
						const { component: Element, type, name, i18nKey, ...rest } = options;
						if (type === 'select')
							return (
								<Element
									control={control}
									label={t(i18nKey)}
									dataSource={lookupFields?.[name]}
									name={name}
									{...rest}
								/>
							);
						return <Element control={control} placeholder={t(i18nKey)} name={name} {...rest} />;
					})}
					<button type='submit' id={id} />
				</SearchBox>
			</ScrollView>
			<ErrorBoundary>
				<StyledDataGrid
					currentTheme={currentTheme}
					height={dtgr_height}
					ref={dataGridRef}
					dataSource={data}
					keyExpr='_id'
					loadPanel={{ enabled: isFetching }}
					scrolling={predefine.scrolling}
					columnFixing={predefine.columnFixing}
					columnResizingMode='widget'
					allowColumnReordering
					allowColumnResizing
					columnAutoWidth
					showBorders
					showColumnLines
					showRowLines
					export={predefine.export}
					selection={predefine.selection}
					toolbar={predefine.toolbar}
					editing={predefine.editing}
					onSaved={handleSave}
					onSelectedRowKeysChange={(value) => {
						setSelectedRowKeys(value);
					}}
					onExporting={(e) => handleExportExcel(e.component, 'Equipments list.xlsx')}>
					{columnsDef.map((colProps, index) => (
						<Column key={index} {...colProps} />
					))}
				</StyledDataGrid>
			</ErrorBoundary>
		</Container>
	);
};

export default EquipmentList;
