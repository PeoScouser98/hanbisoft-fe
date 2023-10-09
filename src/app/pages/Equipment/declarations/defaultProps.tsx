import { TDataGridProps } from '@/types/global';

const searchFields: Array<{
	i18nKey: string;
	key: string;
	name: string;
	type: 'Text' | 'Select';
}> = [
	{
		key: 'item_cd',
		type: 'Text',
		name: 'item_cd',
		i18nKey: 'equipment:item_cd'
	},
	{
		key: 'carcass_cd',
		type: 'Text',
		name: 'carcass_cd',
		i18nKey: 'equipment:carcass_cd'
	},
	{
		key: 'sale_status',
		type: 'Select',
		name: 'sale_status',
		i18nKey: 'equipment:sale_status'
	},
	{
		key: 'prod_type1',
		type: 'Select',
		name: 'prod_type1',
		i18nKey: 'equipment:prod_type1'
	},
	{
		key: 'prod_type2',
		type: 'Select',
		name: 'prod_type2',
		i18nKey: 'equipment:prod_type2'
	},
	{
		key: 'prod_type3',
		type: 'Select',
		name: 'prod_type3',
		i18nKey: 'equipment:prod_type3'
	}
];

const defaultProps: Partial<TDataGridProps> = {
	columns: [
		{
			dataField: 'item_cd',
			width: 160
		},
		{
			dataField: 'prod_type',
			width: 160
		},
		{
			dataField: 'yag',
			width: 160
		},
		{
			dataField: 'prod_type1',
			width: 160
		},
		{
			dataField: 'prod_type2',
			width: 160
		},
		{
			dataField: 'prod_type3',
			width: 160
		},
		{
			dataField: 'carcass_cd',
			width: 128
		},
		{
			dataField: 'fg_cd',
			width: 128
		},
		{
			dataField: 'sales_cd',
			width: 128
		},
		{
			dataField: 'prod_etc1',
			width: 128
		},
		{
			dataField: 'sale_status',
			width: 196
		},
		{
			dataField: 'width',
			width: 128
		},
		{
			dataField: 'length',
			width: 128
		},
		{
			dataField: 'area',
			width: 128
		},
		{
			dataField: 'pyeong',
			width: 128
		},
		{
			dataField: 'weight',
			width: 128
		},
		{
			dataField: 'spec',
			minWidth: 400
		},
		{
			dataField: 'sale_dept_cd'
		}
	],
	keyExpr: '_id',
	paging: {
		enabled: false
	},
	columnResizingMode: 'nextColumn',
	export: {
		enabled: true,
		allowExportSelectedData: true,
		formats: ['excel', 'pdf']
	},
	stateStoring: {
		enabled: true,
		storageKey: 'equipments',
		type: 'sessionStorage'
	},
	columnFixing: {
		enabled: true
	},
	editing: { mode: 'batch', useIcons: true, allowAdding: true, allowUpdating: true, startEditAction: 'dblClick' },
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
	filterSyncEnabled: true
};

export { searchFields };
export default defaultProps;
