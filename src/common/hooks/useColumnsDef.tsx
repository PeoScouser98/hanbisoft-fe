import { IColumnProps } from 'devextreme-react/data-grid';
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
	columns: Array<IColumnProps>,
	locale: { ns: string; key?: string | Array<string> }
) {
	const { t, i18n } = useTranslation(locale.ns);

	return React.useMemo(
		() =>
			columns.map((col) => {
				const prefixer = !!locale.key
					? `${locale.ns}:${Array.isArray(locale.key) ? locale.key.join('.') : locale.key}.`
					: `${locale.ns}:`;
				return {
					...col,
					caption: t(prefixer + col.dataField)
				};
			}),
		[i18n.language, t]
	);
}
