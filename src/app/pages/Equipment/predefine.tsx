import SelectFieldControl, { TSelectFieldProps } from '@/common/components/FormControls/SelectFieldControl';
import TextFieldControl, { TTextFieldProps } from '@/common/components/FormControls/TextFieldControl';
import { IColumnProps, Item } from 'devextreme-react/data-grid';
import { Control, FieldValues } from 'react-hook-form';

export const columns: Array<IColumnProps> = [
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
		dataField: 'sale_cd'
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

export const toolbarItems: Array<typeof Item.prototype.props> = [
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
];

export const renderSearchFields = (control: Control<FieldValues>) => {
	return [
		{
			key: 'item_cd',
			component: TextFieldControl,
			name: 'item_cd' as TTextFieldProps['name'],

			labelMode: 'hidden' as TTextFieldProps['labelMode'],
			control: control as TTextFieldProps['control'],
			placeholder: 'Search by item'
		},
		{
			key: 'carcass_cd',
			component: TextFieldControl,
			name: 'carcass_cd' as TTextFieldProps['name'],

			labelMode: 'hidden' as TTextFieldProps['labelMode'],
			control: control as TTextFieldProps['control'],
			placeholder: 'Search by carcass'
		},
		{
			key: 'sale_status',
			component: SelectFieldControl,
			dataSource: [],
			name: 'sale_status' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			control: control as TSelectFieldProps['control'],
			placeholder: 'Search by sale status'
		},
		{
			key: 'prod_type1',
			component: SelectFieldControl,
			dataSource: [],
			name: 'prod_type1' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			control: control as TSelectFieldProps['control'],
			placeholder: 'Search by prod type (1)'
		},
		{
			key: 'prod_type2',
			component: SelectFieldControl,
			dataSource: [],
			name: 'prod_type2' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			control: control as TSelectFieldProps['control'],
			placeholder: 'Search by prod type (1)'
		},
		{
			key: 'prod_type3',
			component: SelectFieldControl,
			dataSource: [],
			name: 'prod_type3' as TSelectFieldProps['name'],
			labelMode: 'hidden' as TSelectFieldProps['labelMode'],
			control: control as TSelectFieldProps['control'],
			placeholder: 'Search by prod type (1)'
		}
	].map((options) => {
		const { component: Element, ...rest } = options;
		return <Element {...rest} />;
	});
};
