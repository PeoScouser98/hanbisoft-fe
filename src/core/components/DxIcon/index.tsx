import { DxIconProps } from './_type';

const DxIcon = (props: DxIconProps) => <i className={`dx-icon-${props.type}`} {...props}></i>;

export default DxIcon;
