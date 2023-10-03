import { TLookupFields } from '@/types/global';
import { IColumnProps, TColumnDef } from 'devextreme-react/data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @description Returns an array of columns with caption translated with i18n
 * @note Use array of keys if your i18n namespace has nested key(s), order of parent key to child key is the order of key in array, otherwise just using namespace only
 * @example
  	const columns = [{dataField: 'name'}, {dataField: 'age'}] // Define your column first
  	const columnsDef = useColumnsDef(columns, {ns: 'common', key:['form', 'btn']}) 
 	// columnsDef = [ {datField, t('common:form.btn.dataField'), ... other properties ...}]
 */

export default function useColumnsDef(
	columns: Array<TColumnDef>,
	localization: { ns: string; key?: string | Array<string> },
	lookupFields?: TLookupFields
) {
	const { t, i18n } = useTranslation(localization.ns);

	return columns.map((options) => {
		const prefixer = !!localization.key
			? `${localization.ns}:${Array.isArray(localization.key) ? localization.key.join('.') : localization.key}.`
			: `${localization.ns}:`;

		if (lookupFields?.[options.dataField])
			return {
				...options,
				caption: t(prefixer + options.dataField),
				lookup: {
					dataSource: lookupFields?.[options.dataField],
					displayExpr: 'text',
					valueExpr: 'value'
				}
			};
		return {
			...options,
			caption: t(prefixer + options?.dataField)
		};
	}) as Exclude<TColumnDef, IColumnProps>[];
}
