import { useSessionStorage } from '@/app/hooks/useStorage';
import { addMultiEmployees, getEmployees, updateMultiEmployees } from '@/app/services/employee.service';
import type { IEmployee } from '@/core/types/employee';
import handleExportExcel from '@/core/utils/exportExcel';
import { AxiosError } from 'axios';
import DataGrid, {
	Column,
	ColumnChooser,
	ColumnFixing,
	Toolbar as DataGridToolbar,
	Item as DataGridToolbarItem,
	Editing,
	Export,
	FilterRow,
	HeaderFilter,
	IColumnProps,
	Lookup,
	Search,
	Selection
} from 'devextreme-react/data-grid';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { DataChange } from 'devextreme/common/grids';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

const DataGridExample = () => {
	const { data: employees } = useQuery({
		queryKey: ['employees'],
		queryFn: getEmployees,
		cacheTime: 60 * 1000,
		staleTime: 30 * 1000
		// refetchOnMount: true
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

	const [_, setSelectedEmployee] = useSessionStorage('selected_employees', []);
	const selectEmployee = React.useCallback((e: any) => {
		e.component.byKey(e.currentSelectedRowKeys[0]).done((employee: any) => {
			setSelectedEmployee(employee);
		});
	}, []);

	const dataGridRef = React.useRef<any>();
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
			console.log(1);
			const newEmployees = data.filter((item) => item.type === 'insert').map((item) => item.data);
			const updatedEmployees = data.filter((item) => item.type === 'update').map((item) => item.data);
			return await Promise.all([handleAddEmployees(newEmployees), handleUpdateEmployees(updatedEmployees)]);
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		}
	}, []);

	return (
		<Container>
			<Toolbar>
				<Item
					widget='dxButton'
					location='before'
					options={{
						icon: 'save',
						text: 'Save',
						type: 'default',
						onClick: function () {
							dataGridRef.current?.instance.saveEditData();
						}
					}}
				/>
				<Item
					widget='dxButton'
					location='before'
					options={{
						icon: 'undo',
						text: 'Revert',
						onClick: () => dataGridRef.current?.instance?.cancelEditData()
					}}
				/>
			</Toolbar>
			<Toolbar className='dx-theme-border-color-as-background-color' style={{ padding: '8px' }}>
				<Item
					widget='dxTextBox'
					location='before'
					options={{ mode: 'search', placeholder: 'Search by full name ...', width: '100%' }}
				/>
			</Toolbar>

			<DataGrid
				id='demo-data-grid'
				dataSource={employees}
				ref={dataGridRef}
				keyExpr='id'
				scrolling={{
					mode: 'virtual',
					rowRenderingMode: 'virtual',
					columnRenderingMode: 'virtual',
					renderAsync: true
				}}
				columnResizingMode='widget'
				onExporting={(e) => handleExportExcel(e.component, 'Employee list.xlsx')}
				allowColumnReordering
				allowColumnResizing
				columnAutoWidth
				showBorders
				showColumnLines
				showRowLines
				onSaved={(e) => handleSaveData(e.changes)}
				// onInitNewRow={e}
				onSelectionChanged={selectEmployee}>
				<ColumnChooser enabled={true} />
				<HeaderFilter visible={true} />
				<FilterRow visible={true} applyFilter='onClick' />
				{/* <SearchPanel visible /> */}
				{columns.map((column, index) => (
					<Column {...column} key={index} allowSearch={false}>
						{column.lookup && <Lookup {...column.lookup} />}
						{column.allowHeaderFiltering && (
							<HeaderFilter {...column.headerFilter}>
								<Search enabled={true} />
							</HeaderFilter>
						)}
						{column.allowSearch && <FilterRow />}
					</Column>
				))}

				<Export allowExportSelectedData enabled formats={['excel', 'pdf']} />
				<Editing mode='batch' useIcons allowUpdating allowDeleting allowAdding />
				<Selection recursive mode='multiple' selectAllMode='allPages' showCheckBoxesMode='always' />
				<ColumnFixing enabled={true} />

				<DataGridToolbar>
					<DataGridToolbarItem
						name='addRowButton'
						options={{ text: 'Add row' }}
						location='after'
						locateInMenu='auto'
					/>
					<DataGridToolbarItem
						name='columnChooserButton'
						options={{ text: 'Choose columns' }}
						location='after'
						locateInMenu='auto'
					/>

					<DataGridToolbarItem name='exportButton' location='after' locateInMenu='auto' />
					<DataGridToolbarItem name='applyFilterButton' options={{ text: 'Apply' }} location='after' />
					{/* <Item
						name='searchPanel'
						showText='always'
						options={{ text: 'Apply', onChange: (value) => console.log(value) }}
						location='after'
					/> */}
				</DataGridToolbar>
			</DataGrid>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: stretch;
`;

export default DataGridExample;
