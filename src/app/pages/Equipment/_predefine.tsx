import SelectFieldControl, { TSelectFieldProps } from '@/common/components/FormControls/SelectFieldControl';
import TextFieldControl, { TTextFieldProps } from '@/common/components/FormControls/TextFieldControl';
import { IColumnProps, Scrolling } from 'devextreme-react/data-grid';
import { ColumnFixing, Editing, Selection, Toolbar } from 'devextreme/ui/data_grid';

type TPredefine = {
	export: any;
	columnFixing: ColumnFixing;
	editing: Editing;
	selection: Selection;
	toolbar: Toolbar;
	scrolling: Scrolling['props'];
	searchFields: Array<any>;
};

const columns: Array<IColumnProps> = [
	{
		dataField: 'item_cd'
	},
	{
		dataField: 'prod_type'
	},
	{
		dataField: 'yag'
	},
	{
		dataField: 'prod_type1'
	},
	{
		dataField: 'prod_type2'
	},
	{
		dataField: 'prod_type3'
	},
	{
		dataField: 'carcass_cd'
	},
	{
		dataField: 'fg_cd'
	},
	{
		dataField: 'sales_cd'
	},
	{
		dataField: 'prod_etc1'
	},
	{
		dataField: 'sale_status'
	},
	{
		dataField: 'width'
	},
	{
		dataField: 'length'
	},
	{
		dataField: 'area'
	},
	{
		dataField: 'pyeong'
	},
	{
		dataField: 'weight'
	},
	{
		dataField: 'spec',
		minWidth: 384
	},
	{
		dataField: 'sale_dept_cd'
	}
];

const predefine: TPredefine = {
	export: {
		enabled: true,
		allowExportSelectedData: true,
		formats: ['excel', 'pdf']
	},
	searchFields: [
		{
			key: 'item_cd',
			component: TextFieldControl,
			type: 'text',
			name: 'item_cd' as TTextFieldProps['name'],
			labelMode: 'static' as TTextFieldProps['labelMode'],
			i18nKey: 'equipment:item_cd'
		},
		{
			key: 'carcass_cd',
			component: TextFieldControl,
			type: 'text',
			name: 'carcass_cd' as TTextFieldProps['name'],
			labelMode: 'hidden' as TTextFieldProps['labelMode'],
			i18nKey: 'equipment:carcass_cd'
		},
		{
			key: 'sale_status',
			component: SelectFieldControl,
			type: 'select',
			name: 'sale_status' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			i18nKey: 'equipment:sale_status'
		},
		{
			key: 'prod_type1',
			component: SelectFieldControl,
			type: 'select',
			name: 'prod_type1' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			i18nKey: 'equipment:prod_type1'
		},
		{
			key: 'prod_type2',
			component: SelectFieldControl,
			type: 'select',
			name: 'prod_type2' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			i18nKey: 'equipment:prod_type2'
		},
		{
			key: 'prod_type3',
			component: SelectFieldControl,
			type: 'select',
			name: 'prod_type3' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			i18nKey: 'equipment:prod_type3'
		}
	],

	columnFixing: {
		enabled: true
	},
	editing: { mode: 'batch', useIcons: true, allowAdding: true, allowUpdating: true } as Editing,
	selection: {
		showCheckBoxesMode: 'always',
		selectAllMode: 'allPages',
		mode: 'multiple',
		allowSelectAll: true
	},
	toolbar: {
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
		mode: 'infinite',
		rowRenderingMode: 'virtual',
		columnRenderingMode: 'virtual',
		preloadEnabled: true,
		showScrollbar: 'onHover',
		scrollByContent: true
	}
};

export { columns };
export default predefine;
