import { IEmployee } from '@/common/types/employee.type';
import { dxTreeViewItem } from 'devextreme/ui/tree_view';
import { DxIconType } from '../common/components/DxIcon';
import store from '@/app/store/store';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import SelectFieldControl from '@/common/components/FormControls/SelectFieldControl';
import NumberFieldControl from '@/common/components/FormControls/NumberFieldControl';
import RadioGroupFieldControl from '@/common/components/FormControls/RadioGroupFieldControl';
import TextAreaFieldControl from '@/common/components/FormControls/TextAreaFieldControl';

declare global {
	interface Window {
		store: typeof store;
	}
	interface String {
		capitalize: () => string;
	}
	export declare interface HttpResponse<T> {
		message: string;
		data: T;
	}
	export declare type DataTheme = 'generic.light' | 'generic.dark';
	export declare interface IEmployee {
		[key: string]: any;
	}

	export declare interface HttpException {
		status: HttpStatusCode;
		message: string;
	}

	export declare interface IUser {
		readonly _id: string;
		email: string;
		picture: string;
		password: string;
		displayName: string;
		dateOfBirth: Date | string;
		role: UserRoleEnum; // 0 | 1
	}

	export declare type AuthResponse = {
		user: Omit<IUser, 'password'> | null;
		accessToken: string | null;
		authenticated: boolean;
	};

	export declare interface IPage {
		id: string;
		text?: string;
		i18nKey: string;
		path: string;
		canClose: boolean;
		canReorder?: boolean;
	}

	export declare interface INavigation extends dxTreeViewItem {
		icon: DxIconType;
		path?: string;
		i18nKey: string;
		items?: dxTreeViewItem['items'] & INavigation['breadcrumbs'];
		breadcrumbs?: Array<Pick<INavigation, 'i18nKey' | 'path'>>;
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

	export declare type TextFieldControl = typeof TextFieldControl;
	export declare type SelectFieldControl = typeof SelectFieldControl;
	export declare type NumberFieldControl = typeof NumberFieldControl;
	export declare type RadioGroupFieldControl = typeof TextFieldControl;
	export declare type TextAreaFieldControl = typeof TextAreaFieldControl;
}
