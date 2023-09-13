import { IRadioGroupOptions } from 'devextreme-react/radio-group';
import { ISelectBoxOptions } from 'devextreme-react/select-box';
import { ITextBoxOptions } from 'devextreme-react/text-box';
import DataSource from 'devextreme/data/data_source';
import { TextBoxType } from 'devextreme/ui/text_box';
import { Field, FieldValue } from 'react-hook-form';
import TextFieldControl from './TextFieldControl';
import { INumberBoxOptions } from 'devextreme-react/number-box';
import NumberFieldControl from './NumberFieldControl';
import SelectFieldControl from './SelectFieldControl';

export declare type TDefaultFieldProps = {
	name: string;
	control: Control<FieldValue>;
};

export declare type TTextFieldProps = TDefaultFieldProps & ITextBoxOptions;
export declare type TSelectFieldProps = TDefaultFieldProps & ISelectBoxOptions;
export declare type TRadioGroupProps = TDefaultFieldProps & IRadioGroupOptions;
export declare type TNumberFieldProps = TDefaultFieldProps & INumberBoxOptions;
