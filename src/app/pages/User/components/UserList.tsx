import { useGetUsersQuery } from '@/app/store/apis/user.api';
import { UserRoleEnum } from '@/common/constants/_app.const';
import handleExportExcel from '@/common/utils/exportExcel';
import getDataGridChanges from '@/common/utils/getDataGridChanges';
import DataGrid, { Column, ColumnFixing, Editing, Export, IColumnProps } from 'devextreme-react/data-grid';
import { SavedEvent } from 'devextreme/ui/data_grid';
import React from 'react';
import styled from '@emotion/styled';
import '@/common/utils/string';

const UserList: React.FC<unknown> = () => {
	const { data: users } = useGetUsersQuery({});
	const dataGridRef = React.useRef<typeof DataGrid.prototype>(null);
	const columns = React.useMemo<IColumnProps[]>(
		() => [
			{
				dataField: 'id',
				width: 'auto'
			},

			{
				dataField: 'displayName',
				caption: 'Full name',
				cellRender: (instance) => {
					const {
						row: { data }
					} = instance;

					return (
						<Flex>
							<Image src={data?.picture} alt='picture' />
							{data?.displayName}
						</Flex>
					);
				},
				allowSorting: true
			},
			{
				dataField: 'dateOfBirth',
				dataType: 'date',
				format: 'dd/MM/yyyy'
			},
			{
				dataField: 'email',
				allowSorting: true,
				validationRules: [
					{
						type: 'required',
						message: 'Email is required'
					},
					{
						type: 'email',
						message: 'Invalid email'
					}
				]
			},
			{
				dataField: 'role',
				dataType: 'string',
				allowSorting: false,
				cellRender: (instance) => {
					const role = instance.value as keyof typeof UserRoleEnum;
					return UserRoleEnum[role].toString().capitalize();
				}
			}
		],
		[]
	);
	const handleSaveChanges = async (e: SavedEvent<any, any>) => {
		const { newData, updatedData, deletedData } = getDataGridChanges(e);
		console.log(newData);
	};
	return (
		<DataGrid
			ref={dataGridRef}
			dataSource={users}
			scrolling={{
				mode: 'virtual',
				rowRenderingMode: 'virtual',
				columnRenderingMode: 'virtual',
				renderAsync: true,
				preloadEnabled: true
			}}
			onSaved={handleSaveChanges}
			onExporting={(e) => handleExportExcel(e.component, 'Users.xlsx')}
			onEditingStart={(e) => {
				console.log(e.component);
				// e.component.option('editing.popup.title',)
			}}
			cacheEnabled
			showBorders
			showColumnLines
			showRowLines>
			{columns.map((colProps, index) => (
				<Column key={index} {...colProps} />
			))}
			<Editing
				mode='popup'
				// refreshMode='full'
				useIcons
				allowUpdating
				allowDeleting
				confirmDelete
				allowAdding
				selectTextOnEditStart={false}
			/>
			<Export enabled formats={['excel']} />
			<ColumnFixing />
		</DataGrid>
	);
};

const Image = styled.img`
	max-width: 32px;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: center;
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export default UserList;
