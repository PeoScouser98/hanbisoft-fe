import { IEmployee } from '@/common/types/employee.type';
import { dxTreeViewItem } from 'devextreme/ui/tree_view';
import { DxIconType } from '../common/components/DxIcon';
import store from '@/app/store/store';

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
}
