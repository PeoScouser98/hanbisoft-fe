/**
 * @copyright PeoScouser98
 */

import type { TDxIcon } from 'devextreme';

export default function DxIcon(props: DxIconProps) {
	return <i className={`dx-icon dx-icon-${props.type}`} style={{ fontSize: 'inherit' }} {...props}></i>;
}

export interface DxIconProps extends React.AllHTMLAttributes<HTMLElement> {
	type: TDxIcon;
}
