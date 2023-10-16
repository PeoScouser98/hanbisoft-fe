import { IEmployee } from '@/common/types/employee.type';
import { dxTreeViewItem } from 'devextreme/ui/tree_view';
import store from '@/app/store/store';
import TextFieldControl from '@/common/components/FormControls/TextFieldControl';
import SelectFieldControl from '@/common/components/FormControls/SelectFieldControl';
import NumberFieldControl from '@/common/components/FormControls/NumberFieldControl';
import RadioGroupFieldControl from '@/common/components/FormControls/RadioGroupFieldControl';
import TextAreaFieldControl from '@/common/components/FormControls/TextAreaFieldControl';
import { Control, FieldValues } from 'react-hook-form';
import { Column, dxDataGridOptions } from 'devextreme/ui/data_grid';
import { IColumnProps } from 'devextreme-react/data-grid';
import React from 'react';
import { DefaultUserRoleEnum } from '@/common/constants/app.const';
import { dxFileUploaderOptions } from 'devextreme/ui/file_uploader';
import { Interpolation, Theme } from '@emotion/react';
import { TDxIcon } from 'devextreme';
import { HttpStatusCode } from 'axios';

declare global {
	interface Window {
		store: typeof store;
	}
	interface String {
		capitalize: () => string;
	}
}

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

// #region HTTP
export declare type HttpResponse<T> = {
	status?: HttpStatusCode;
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
	variant?: 'h1' | 'h2' | 'h3' | 'p' | 'small';
	color?: 'accent' | 'danger' | 'success' | 'warning';
	theme?: Theme;
	lineClamp?: number;
	as?: keyof HTMLElementTagNameMap;
}

export declare type TImageProps = React.ClassAttributes<HTMLImageElement> &
	React.ImgHTMLAttributes<HTMLImageElement> & {
		css?: Interpolation<Theme>;
		fallbackImage?: string;
		skeletonProps?: typeof Skeleton.prototype.props;
	};

export declare type TSwitchProps = {
	onElement?: React.ComponentType<React.AllHTMLAttributes<HTMLElement>>;
	offElement?: React.ComponentType<React.AllHTMLAttributes<HTMLElement>>;
	checked?: boolean;
	onChange?: (...params) => unknown;
};

export declare type TDataGridProps = dxDataGridOptions;
export declare type TColumnDef = Column | IColumnProps | (typeof TDataGridProps)['columns'];

export declare type TTextFieldProps = RequiredFieldControlProps & ITextBoxOptions & { size?: 'sm' | 'md' | 'lg' };
export declare type TSelectFieldProps = RequiredFieldControlProps & ISelectBoxOptions & { size?: 'sm' | 'md' | 'lg' };
export declare type TNumberFieldProps = RequiredFieldControlProps & INumberBoxOptions & { size?: 'sm' | 'md' | 'lg' };
export declare type TTextAreaFieldProps = RequiredFieldControlProps & ITextAreaOptions & { size?: 'sm' | 'md' | 'lg' };
export declare type TRadioGroupProps = RequiredFieldControlProps & IRadioGroupOptions;
export declare type TFileUploadFieldProps = RequiredFieldControlProps & dxFileUploaderOptions & { label: string };

export declare type TextFieldControl = React.FC<TTextFieldProps>;
export declare type SelectFieldControl = React.FC<TSelectFieldProps>;
export declare type NumberFieldControl = React.FC<TNumberFieldProps>;
export declare type RadioGroupFieldControl = React.FC<TRadioGroupProps>;
export declare type TextAreaFieldControl = React.FC<TTextAreaFieldProps>;
// #endregion
