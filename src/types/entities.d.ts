import { dxTreeViewItem } from 'devextreme/ui/tree_view';

export declare interface IUserRole {
	readonly _id: string;
	readonly role_cd: number;
	role_name?: string;
	permissions: {
		allow_adding: boolean;
		allow_updating: boolean;
		allow_deleting: boolean;
	};
	createdAt?: Date;
	updatedAt?: Date;
}
export declare interface IUser {
	readonly _id: string;
	email: string;
	picture: string;
	password: string;
	display_name: string;
	phone: string;
	address: string;
	role: IUserRole;
}

// export

export declare interface IPage {
	readonly id: string;
	text?: string;
	locale: string;
	path: string;
	canClose: boolean;
	canReorder?: boolean;
}

export declare interface INavigation extends dxTreeViewItem {
	readonly id: string;
	icon: TDxIcon | string;
	path?: string;
	locale?: string;
	items?: dxTreeViewItem['items'] & INavigation['breadcrumbs'];
	breadcrumbs?: Array<Pick<INavigation, 'locale' | 'path'>>;
}

export declare interface IEquipment {
	readonly _id: string;
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
