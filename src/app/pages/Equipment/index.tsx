import equipmentService from '@/app/services/equipment.service';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import useScreenSize from '@/common/hooks/useScreenSize';
import handleExportExcel from '@/common/utils/exportExcel';
import styled from '@emotion/styled';
import { SearchOutlined } from '@mui/icons-material';
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, DataGrid } from 'devextreme-react';
import { Column } from 'devextreme-react/data-grid';
import { ContentReadyEvent, SavedEvent } from 'devextreme/ui/data_grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { columns, renderSearchFields, toolbarItems } from './predefine';
import { IButtonOptions } from 'devextreme-react/button';
import ErrorBoundary from '@/common/components/ErrorBoundary';

const EquipmentList = () => {
	// const [skip, setSkip] = React.useState<number>(0);
	const { t } = useTranslation('common');
	const { control, handleSubmit } = useForm();
	const id = React.useId();
	const [selectedRowKeys, setSelectedRowKeys] = React.useState<Array<string>>([]);
	const columnsDef = useColumnsDef(columns, { ns: 'equipment' });
	const screenSize = useScreenSize();
	const [dataSource, setDataSource] = React.useState<IEquipment[]>([]);

	const queryClient = useQueryClient();

	const { isFetching } = useQuery<HttpResponse<IEquipment[]>, Error, HttpResponse<IEquipment[]>, QueryKey>({
		queryKey: ['equipment'],
		queryFn: () => equipmentService.getAll(),
		initialData: { data: [], message: null },
		onSuccess: (res) => {
			console.log(res);
			setDataSource(res?.data);
		}
	});

	const { data: lookupFieldValues } = useQuery<any>({
		queryKey: ['equipment', 'equipment_lookup'],
		queryFn: equipmentService.getLookupFieldsValue,
		initialData: { saleCodes: [], saleStatus: [], prodType: [], proType1: [], prodType2: [], prodType3: [] },
		enabled: true,
		select: (res) => res.data,
		onSuccess: (res) => {
			console.log(res);
		}
	});

	const { mutateAsync: searchAsync } = useMutation({
		mutationKey: ['equipment'],
		mutationFn: equipmentService.search,
		onSuccess: (res) => setDataSource(res?.data || [])
	});

	const { mutateAsync: saveMutation } = useMutation({
		mutationKey: ['equipment'],
		mutationFn: equipmentService.save,
		onSuccess: () => queryClient.invalidateQueries(['equipment'])
	});
	const { mutateAsync: deleteMutation } = useMutation({
		mutationKey: ['equipment', selectedRowKeys],
		mutationFn: equipmentService.delete,
		onSuccess: (res) => queryClient.invalidateQueries(['equipment'])
	});

	const dataGridRef = React.useRef<typeof DataGrid.prototype>(null);
	console.log(dataGridRef.current);
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
				text: t('common:btn.search'),
				type: 'success'
			},
			{
				key: 'save',
				icon: 'save',
				text: t('common:btn.save'),
				type: 'default',
				// disabled:dataGridRef.current.instance.get ,
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

	const handleSearch = async (data) => {
		const searchTermsObj = {};
		Object.keys(data).forEach((key) => {
			if (data[key]) searchTermsObj[key] = data[key];
		});
		return await searchAsync(searchTermsObj);
	};

	const handleSave = async (e: SavedEvent) => {
		console.log(e.changes);
		toast.promise(saveMutation(e.changes), {
			loading: 'Saving data ...',
			success: (res) => {
				const _res = res as unknown as HttpResponse<IEquipment>;
				return _res.message;
			},
			error: 'Failed to save data'
		});
	};

	const handleDelete = async () => {
		console.log('selectedRowKeys :>> ', selectedRowKeys);
		if (confirm('Aggree to delete data?'))
			toast.promise(async () => await deleteMutation(selectedRowKeys), {
				loading: 'Deleting data ...',
				success: (res) => res.message,
				error: 'Failed to delete'
			});
	};

	const handleScrollToBottom = async (e: ContentReadyEvent) => {
		e.component.getScrollable().on('scroll', function (e) {
			if (e.reachedBottom) {
				console.log('bottom reached');
			}
		});
	};

	const dxTableHeight = React.useMemo(() => screenSize.height - 286, [screenSize.height]);

	return (
		<Container>
			<ButtonGroup>
				{actionButtonsGroup.map((props) => (
					<Button {...props} />
				))}
			</ButtonGroup>

			<SearchBox
				onSubmit={handleSubmit(handleSearch)}
				className='dx-theme-border-color-as-background-color dx-theme-border-color'>
				{renderSearchFields(control, lookupFieldValues)}
				<button type='submit' id={id} />
			</SearchBox>
			<ErrorBoundary>
				<StyledDataGrid
					height={dxTableHeight}
					ref={dataGridRef}
					dataSource={dataSource}
					keyExpr='_id'
					// onEditingStart={(e) => console.log(e.data)}
					// onEditCanceling={e=>console.log(e.changes)}
					loadPanel={{ enabled: isFetching }}
					scrolling={{
						mode: 'infinite',
						rowRenderingMode: 'virtual',
						columnRenderingMode: 'virtual',
						preloadEnabled: true,
						showScrollbar: 'onHover',
						scrollByContent: true
					}}
					columnFixing={{
						enabled: true
					}}
					onContentReady={handleScrollToBottom}
					columnResizingMode='widget'
					allowColumnReordering
					allowColumnResizing
					columnAutoWidth
					showBorders
					showColumnLines
					showRowLines
					export={{
						enabled: true,
						allowExportSelectedData: true,
						formats: ['excel', 'pdf']
					}}
					selection={{
						showCheckBoxesMode: 'always',
						selectAllMode: 'allPages',
						mode: 'multiple',
						allowSelectAll: true
					}}
					toolbar={{ items: toolbarItems }}
					editing={{
						mode: 'batch',
						useIcons: true,
						allowAdding: true,
						allowUpdating: true
					}}
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

const Container = styled.div`
	/* overflow: hidden; */
	display: flex;
	justify-content: flex-start;
	gap: 8px;
	align-items: stretch;
	flex-direction: column;
`;

const StyledDataGrid = styled(DataGrid)`
	& div.dx-datagrid-header-panel {
		position: sticky;
		top: 0;

		/*z-index is applied so that this element appears in front*/
	}
	& .dx-datagrid-headers.dx-datagrid-nowrap {
		position: sticky;
		top: 0px;
	}
`;

const SearchBox = styled.form`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	row-gap: 8px;
	column-gap: 4px;
	padding: 4px;
	& > * {
		min-width: 10rem;
	}
	@media (min-width: 384px) and (max-width: 767px) {
		grid-template-columns: repeat(6, 2fr);
	}
	@media (min-width: 768px) and (max-width: 1365px) {
		grid-template-columns: repeat(6, 4fr);
	}
	& button[type='submit'] {
		display: none;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: stretch;
	gap: 4px;
`;

const SearchSubmitLabel = styled.label`
	display: inline-flex;
	align-items: start;
	padding: 0;
	gap: 4px;
	& .MuiSvgIcon-root {
		font-size: 20px;
	}
`;

export default EquipmentList;
