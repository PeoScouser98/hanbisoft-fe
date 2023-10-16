import { TDataGridProps } from '@/types/global';

const defaultProps: Partial<TDataGridProps> = {
	keyExpr: '_id',
	remoteOperations: false,
	editing: {
		mode: 'batch',
		useIcons: true,
		allowAdding: true,
		allowUpdating: true,
		startEditAction: 'dblClick',
		newRowPosition: 'viewportBottom'
	},
	selection: {
		showCheckBoxesMode: 'always',
		selectAllMode: 'allPages',
		mode: 'multiple',
		allowSelectAll: true
	},
	toolbar: {
		visible: true,
		items: [
			{
				name: 'addRowButton',
				location: 'after'
			},
			{
				name: 'revertButton',
				location: 'after'
			},
			{
				name: 'exportButton',
				location: 'after'
			}
		]
	},
	scrolling: {
		mode: 'virtual',
		rowRenderingMode: 'virtual',
		columnRenderingMode: 'virtual',
		useNative: false,
		preloadEnabled: true,
		scrollByThumb: true,
		showScrollbar: 'onHover'
	},
	allowColumnReordering: true,
	allowColumnResizing: true,
	columnAutoWidth: false,
	showBorders: true,
	showColumnLines: true,
	showRowLines: true,
	cacheEnabled: true,
	filterSyncEnabled: true,
	columns: [
		{
			dataField: 'role_cd',
			dataType: 'number',
			visible: false
		},
		{
			dataField: 'role_name',
			validationRules: [
				{
					type: 'required',
					trim: true
				}
			]
		},
		{
			dataField: 'permissions.allow_adding',
			allowSorting: false,
			allowFiltering: false,
			alignment: 'center',
			allowEditing: true,
			dataType: 'boolean',
			editorOptions: {
				type: 'dxCheckBox'
			}
		},
		{
			dataField: 'permissions.allow_updating',
			alignment: 'center',
			allowSorting: false,
			allowEditing: true,
			allowFiltering: false,
			dataType: 'boolean',
			editorOptions: {
				type: 'dxCheckBox'
			}
		},
		{
			dataField: 'permissions.allow_deleting',
			alignment: 'center',
			allowSorting: false,
			allowEditing: true,
			allowFiltering: false,
			dataType: 'boolean',
			editorOptions: {
				type: 'dxCheckBox'
			}
		}
	]
};

export default defaultProps;
