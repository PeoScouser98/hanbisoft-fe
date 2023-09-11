import { dxTreeViewItem } from 'devextreme/ui/tree_view';
import { DxIconType } from '../components/DxIcon/t';

export declare interface INavigation extends dxTreeViewItem {
	icon: DxIconType;
	path?: string;
	items?: dxTreeViewItem['items'] & INavigation['breadcrumbs'];
	breadcrumbs?: Array<Pick<INavigation, 'text' | 'path'>>;
}
