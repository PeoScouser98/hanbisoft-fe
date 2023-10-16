import SelectFieldControl from '@/common/components/FormControls/SelectFieldControl';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import { TDataGridProps, TSelectFieldProps, TTextAreaFieldProps } from '@/types/global';
import React from 'react';

const searchFields: Array<{
	label: string;
	key: string;
	name: string;
	type: 'Text' | 'Select';
	component?: React.ComponentType<TSelectFieldProps | TTextAreaFieldProps>;
	props?: {
		label: string;
		key: string;
		name: string;
		type: 'Text' | 'Select';
	};
}> = [
	{
		key: 'item_cd',
		type: 'Text',
		name: 'item_cd',
		component: TextFieldControl,
		label: 'equipment:item_cd'
	},
	{
		key: 'carcass_cd',
		component: TextFieldControl,
		type: 'Text',
		name: 'carcass_cd',
		label: 'equipment:carcass_cd'
	},
	{
		key: 'sale_status',
		type: 'Select',
		component: SelectFieldControl,
		name: 'sale_status',
		label: 'equipment:sale_status'
	},
	{
		key: 'prod_type1',
		type: 'Select',
		component: SelectFieldControl,
		name: 'prod_type1',
		label: 'equipment:prod_type1'
	},
	{
		key: 'prod_type2',
		type: 'Select',
		component: SelectFieldControl,
		name: 'prod_type2',
		label: 'equipment:prod_type2'
	},
	{
		key: 'prod_type3',
		type: 'Select',
		component: SelectFieldControl,
		name: 'prod_type3',
		label: 'equipment:prod_type3'
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
