import { useSessionStorage } from '@/app/hooks/useStorage';
import { addMultiEmployees, getEmployees, updateMultiEmployees } from '@/app/services/employee.service';
import handleExportExcel from '@/core/helpers/exportExcel';
import type { IEmployee } from '@/core/types/employee';
import { AxiosError } from 'axios';
import DataGrid, {
	Column,
	ColumnFixing,
	Editing,
	Export,
	FilterRow,
	HeaderFilter,
	IColumnProps,
	IItemProps,
	Item,
	Lookup,
	Search,
	Selection,
	Toolbar
} from 'devextreme-react/data-grid';
import { DataChange } from 'devextreme/common/grids';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

const DataGridExample = () => {
	const { data: employees } = useQuery({
		queryKey: ['employees'],
		queryFn: () => getEmployees(),
		staleTime: Infinity,
		refetchOnMount: true,
		initialData: []
	});

	const { mutateAsync: handleAddEmployees } = useMutation({
		mutationKey: ['employees'],
		mutationFn: (data: Array<Partial<IEmployee>>) => addMultiEmployees(data),
		useErrorBoundary: true
	});
	const { mutateAsync: handleUpdateEmployees } = useMutation({
		mutationKey: ['employees'],
		mutationFn: (data: Array<Partial<IEmployee>>) => updateMultiEmployees(data),
		useErrorBoundary: true
	});

	// const { data: states } = useQuery({
	// 	queryKey: ['states'],
	// 	queryFn: getAvailableStates,
	// 	cacheTime: 60 * 1000,
	// 	staleTime: 60 * 1000,
	// 	useErrorBoundary: true,
	// 	initialData: []
	// });

	// const [currentPageSize, setCurrentPageSize] = React.useState(5);

	const [selectedEmployee, setSelectedEmployee] = useSessionStorage('selected_employees', []);
	const selectEmployee = React.useCallback((e: any) => {
		e.component.byKey(e.currentSelectedRowKeys[0]).done((employee: any) => {
			setSelectedEmployee(employee);
		});
	}, []);

	const columns = React.useMemo<IColumnProps[]>(
		() => [
			{
				dataField: 'id',
				caption: 'ID',
				allowHeaderFiltering: false,
				allowFiltering: false,
				width: 60
			},
			{
				dataField: 'fullName',
				headerFilter: { visible: true },
				allowHeaderFiltering: true,
				allowFiltering: true
			},
			{
				dataField: 'position',
				allowSearch: false,
				allowHeaderFiltering: true
			},
			{
				dataField: 'birthDate',
				dataType: 'date',
				format: 'dd/MM/yyyy',
				allowFiltering: true
			},
			{
				dataField: 'city',
				allowSearch: true,
				allowHeaderFiltering: true,
				allowHiding: true,
				headerFilter: { visible: true }
			}
		],
		[employees]
	);

	const handleSaveData = React.useCallback(async (data: DataChange<Partial<IEmployee>, any>[]) => {
		try {
			console.log(data);
			const newEmployees = data.filter((item) => item.type === 'insert').map((item) => item.data);
			const updatedEmployees = data.filter((item) => item.type === 'update').map((item) => item.data);
			return await Promise.all([handleAddEmployees(newEmployees), handleUpdateEmployees(updatedEmployees)]);
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		}
	}, []);

	const toolbarButtons = React.useMemo<IItemProps[]>(
		() => [
			{ name: 'saveButton', location: 'before', widget: 'dxButton', showText: 'always', options: { text: 'Save' } },
			{
				name: 'addRowButton',
				location: 'before',
				widget: 'dxButton',
				showText: 'always',
				options: { text: 'Add row' }
			},
			{
				name: 'revertButton',
				location: 'before',
				widget: 'dxButton',
				showText: 'always',
				options: { text: 'Revert' }
			},
			{
				name: 'exportButton',
				location: 'before',
				widget: 'dxButton',
				showText: 'always',
				options: { text: 'Export' }
			},
			{
				name: 'applyFilterButton',
				location: 'before',
				widget: 'dxButton',
				showText: 'always',
				options: { text: 'Apply filter' }
			}
		],
		[]
	);

	return (
		<DataGrid
			id='demo-data-grid'
			dataSource={employees?.map((item) => ({
				id: item.id,
				fullName: item.fullName,
				position: item.position,
				birthDate: item.birthDate,
				city: item.city
			}))}
			keyExpr='id'
			scrolling={{ mode: 'virtual', rowRenderingMode: 'virtual', columnRenderingMode: 'virtual', renderAsync: true }}
			columnResizingMode='widget'
			onExporting={(e) => handleExportExcel(e.component, 'Employee list.xlsx')}
			allowColumnReordering
			allowColumnResizing
			columnAutoWidth
			showBorders
			showColumnLines
			showRowLines
			onSaved={(e) => handleSaveData(e.changes)}
			onSelectionChanged={selectEmployee}>
			<HeaderFilter visible={true} />
			<FilterRow visible={true} applyFilter='onClick' />
			{columns.map((column, index) => (
				<Column {...column} key={index}>
					{column.lookup && <Lookup {...column.lookup} />}
					{column.allowHeaderFiltering && (
						<HeaderFilter {...column.headerFilter}>
							<Search enabled={true} />
						</HeaderFilter>
					)}
					{column.allowSearch && <FilterRow />}
				</Column>
			))}
			<Toolbar>
				{toolbarButtons.map((buttonOptions, index) => (
					<Item key={index} {...buttonOptions} />
				))}
			</Toolbar>
			<Export enabled formats={['excel', 'pdf']} />
			<Editing selectTextOnEditStart mode='batch' useIcons allowUpdating allowDeleting allowAdding />
			<Selection recursive mode='multiple' selectAllMode='allPages' showCheckBoxesMode='always' />
			<ColumnFixing enabled={true} />
		</DataGrid>
	);
};

export default DataGridExample;
