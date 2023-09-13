import { DxIconType } from '../components/DxIcon';

export declare interface IPage {
	id: string;
	text: string;
	path: string;
	icon?: DxIconType;
	canClose: boolean;
	canReorder?: boolean;
	// canDrageAndDrop: boolean;
}
