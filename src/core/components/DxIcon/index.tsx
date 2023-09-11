import { DxIconProps } from './t';

const DxIcon = (props: DxIconProps) => <i className={`dx-icon-${props.type}`} {...props}></i>;

export default DxIcon;
