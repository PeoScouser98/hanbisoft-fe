import { useGetUserRolesQuery, useUpsertUserRoleQuery } from '@/app/services/hooks/useUserRoleQueries';
import ButtonList, { TButtonListProps } from '@/common/components/Buttons/ButtonGroup';
import StyledDataGrid from '@/common/components/StyledDataGrid';
import { DefaultUserRoleEnum } from '@/common/constants/app.const';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import { IUserRole } from '@/types/entities';
import styled from '@emotion/styled';
import { Button } from 'devextreme-react';
import dxCheckBox, { InitializedEvent, ValueChangedEvent } from 'devextreme/ui/check_box';
import dxDataGrid, { EditorPreparingEvent, SavedEvent, SelectionChangedEvent } from 'devextreme/ui/data_grid';
import { confirm } from 'devextreme/ui/dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import defaultProps from './defaultProps';

const { columns, ...restProps } = defaultProps;

const AccessManagementPanel: React.FunctionComponent = () => {
	const { t, i18n } = useTranslation(['common', 'user_role']);
	const { data } = useGetUserRolesQuery();
	const { mutateAsync: saveAsync } = useUpsertUserRoleQuery();
	const dataGridRef = React.useRef<typeof StyledDataGrid.prototype>(null);
	const [hasEditedData, setHasEditedData] = React.useState<boolean>(false);
	const [selectedRows, setSelectedRows] = React.useState<Array<string>>([]);
	const columnsDef = useColumnsDef(columns, { ns: 'user_role' });
	const selectionRef = React.useRef<{
		checkBoxUpdating: boolean;
		selectAllCheckBox: dxCheckBox | null;
	}>({
		checkBoxUpdating: false,
		selectAllCheckBox: null
	});

	const buttons = React.useMemo<TButtonListProps['items']>(
		() => [
			{
				component: Button,
				props: {
					type: 'success',
					icon: 'save',
					disabled: !hasEditedData,
					text: t('common:btn.save'),
					onClick: () => dataGridRef.current?.instance?.saveEditData()
				}
			},
			{
				component: Button,
				props: {
					type: 'danger',
					icon: 'trash',
					disabled: !selectedRows.length,
					text: t('common:btn.delete')
				}
			}
		],
		[i18n.language, selectedRows, hasEditedData]
	);

	const handleEditorPreparing = React.useCallback((dataGridEvent: EditorPreparingEvent) => {
		if (dataGridEvent['type'] !== 'selection') return;
		// Disable
		if (dataGridEvent.parentType === 'dataRow' && !!dataGridEvent.row && !checkIsSelectable(dataGridEvent.row.data))
			dataGridEvent.editorOptions.disabled = true;

		if (dataGridEvent.parentType === 'headerRow') {
			dataGridEvent.editorOptions.onInitialized = (editorEvent: InitializedEvent) => {
				if (editorEvent.component) selectionRef.current.selectAllCheckBox = editorEvent.component;
			};
			dataGridEvent.editorOptions.value = !checkIsSelectAll(dataGridEvent.component);
			dataGridEvent.editorOptions.onValueChanged = (editorEvent: ValueChangedEvent) => {
				if (!editorEvent.event) {
					if (editorEvent.previousValue && selectionRef.current.checkBoxUpdating)
						editorEvent.component.option('value', editorEvent.previousValue);
					return;
				}

				if (checkIsSelectAll(dataGridEvent.component) === editorEvent.value) return;
				editorEvent.value ? dataGridEvent.component.selectAll() : dataGridEvent.component.deselectAll();
				editorEvent.event.preventDefault();
			};
		}
	}, []);

	const handleSelectionChanged = React.useCallback((e: SelectionChangedEvent) => {
		const deselectRowKeys: number[] = [];
		e.selectedRowsData.forEach((item) => {
			if (!checkIsSelectable(item)) deselectRowKeys.push(e.component.keyOf(item));
		});
		if (deselectRowKeys.length) {
			e.component.deselectRows(deselectRowKeys);
		}

		selectionRef.current.checkBoxUpdating = true;
		const selectAllCheckBox = selectionRef.current.selectAllCheckBox;
		selectAllCheckBox?.option('value', checkIsSelectAll(e.component));
		selectionRef.current.checkBoxUpdating = false;
	}, []);

	const handleSaveDataChanges = async (e: SavedEvent) => {
		const result = await confirm(/*template*/ `<i>Accept those changes?</i>`, 'Confirm changes');
		if (result) {
			console.log(e.changes);
			toast.promise(saveAsync(e.changes), {
				loading: t('notify.loading'),
				success: t('notify.success'),
				error: t('notify.error')
			});
		}
		return result;
	};

	return (
		<Container>
			<ButtonList items={buttons} />
			<StyledDataGrid
				ref={dataGridRef}
				dataSource={data}
				columns={columnsDef}
				onEditorPreparing={handleEditorPreparing}
				onSelectedRowKeysChange={setSelectedRows}
				onSelectionChanged={handleSelectionChanged}
				onContentReady={(e) => {
					setHasEditedData(e.component.hasEditData());
				}}
				onEditingStart={(e) => {
					const rowData = e.data as Pick<IUserRole, 'role_cd'>;
					const uneditable = Object.values(DefaultUserRoleEnum).includes(rowData?.role_cd);
					e.cancel = uneditable;
				}}
				onSaved={handleSaveDataChanges}
				{...restProps}
			/>
		</Container>
	);
};

function checkIsSelectable(item) {
	return !Object.values(DefaultUserRoleEnum).includes(item.role_cd);
}

function checkIsSelectAll(dataGrid: dxDataGrid<Partial<IUserRole>, unknown>) {
	let items: Partial<IUserRole>[] = [];
	dataGrid
		.getDataSource()
		?.store()
		?.load()
		?.then((data) => {
			items = data as Partial<IUserRole>[];
		});

	let selectableItems = items.filter(checkIsSelectable);
	let selectedRowKeys = dataGrid.option('selectedRowKeys');
	if (!selectedRowKeys || !selectedRowKeys.length) {
		return false;
	}
	return selectedRowKeys.length >= selectableItems.length ? true : undefined;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	align-items: stretch;
`;

export default AccessManagementPanel;
