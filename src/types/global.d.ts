import { IEmployee } from '@/common/types/employee.type';
import { dxTreeViewItem } from 'devextreme/ui/tree_view';
import { DxIconType } from '../common/components/DxIcon';
import store from '@/app/store/store';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import SelectFieldControl from '@/common/components/FormControls/SelectFieldControl';
import NumberFieldControl from '@/common/components/FormControls/NumberFieldControl';
import RadioGroupFieldControl from '@/common/components/FormControls/RadioGroupFieldControl';
import TextAreaFieldControl from '@/common/components/FormControls/TextAreaFieldControl';
import { Control, FieldValues } from 'react-hook-form';
import { Column } from 'devextreme/ui/data_grid';
import { IColumnProps } from 'devextreme-react/data-grid';
import React from 'react';
import { UserRoleEnum } from '@/common/constants/_app.const';

declare global {
	interface Window {
		store: typeof store;
	}
	interface String {
		capitalize: () => string;
	}
}

// #region HTTP
export declare type HttpResponse<T> = {
	message: string;
	metadata: T;
};
export declare type HttpException = {
	status: HttpStatusCode;
	message: string;
};
export declare type PaginateResult<T> = {
	docs: Array<T>;
	totalDocs: number;
	limit: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	page?: number | undefined;
	totalPages: number;
	offset: number;
	prevPage?: number | null | undefined;
	nextPage?: number | null | undefined;
	pagingCounter: number;
	meta?: any;
};

export declare type AuthResponse = {
	user: Omit<IUser, 'password'> | null;
	accessToken: string | null;
	authenticated: boolean;
};
// #endregion

// #region Entities
export declare interface IUser {
	_id: string;
	email: string;
	age: number;
	picture: string;
	password: string;
	display_name: string;
	phone: string;
	address: string;
	role: UserRoleEnum; // 0 | 1
}
export declare interface IPage {
	id: string;
	text?: string;
	locale: string;
	path: string;
	canClose: boolean;
	canReorder?: boolean;
}
export declare interface TNavigation extends dxTreeViewItem {
	icon: DxIconType;
	path?: string;
	locale: string;
	items?: dxTreeViewItem['items'] & TNavigation['breadcrumbs'];
	breadcrumbs?: Array<Pick<TNavigation, 'locale' | 'path'>>;
}
export declare interface IEquipment {
	prod_etc1: string;
	sale_status: string;
	sale_dept_cd: string;
	spec: string;
	sales_cd: string;
	width: number;
	carcass_cd: string;
	weight: number;
	area: number;
	yag: string;
	prod_type3: string;
	pyeong: number;
	prod_type1: string;
	prod_type: string;
	item_cd: string;
}
// #endregion

// #region Form field controls
export declare type RequiredFieldControlProps = Required<{
	control: Control<FieldValues>;
	name: string;
}>;

export declare type TLookupFields = {
	[key: string]: Array<{
		text: string;
		value: string | number | boolean;
	}>;
};

export declare interface ITypographyProps extends React.AllHTMLAttributes<HTMLElement>, React.PropsWithChildren {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
	color?: 'accent' | 'danger' | 'success' | 'warning';
	theme?: Theme;
	as?: keyof HTMLElementTagNameMap;
}

export declare type TTextFieldProps = RequiredFieldControlProps & ITextBoxOptions;
export declare type TSelectFieldProps = RequiredFieldControlProps & ISelectBoxOptions;
export declare type TNumberFieldProps = RequiredFieldControlProps & INumberBoxOptions;
export declare type TRadioGroupProps = RequiredFieldControlProps & IRadioGroupOptions;
export declare type TTextAreaFieldProps = RequiredFieldControlProps & ITextAreaOptions;

export declare type TextFieldControl = React.FC<TTextFieldProps>;
export declare type SelectFieldControl = React.FC<TSelectFieldProps>;
export declare type NumberFieldControl = React.FC<TNumberFieldProps>;
export declare type RadioGroupFieldControl = React.FC<TRadioGroupProps>;
export declare type TextAreaFieldControl = React.FC<TTextAreaFieldProps>;
// #endregion
