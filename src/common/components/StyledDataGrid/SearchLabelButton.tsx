import { Interpolation, Theme } from '@emotion/react';
import { Button } from 'devextreme-react';
import React from 'react';

import { useTranslation } from 'react-i18next';

type Props = React.ClassAttributes<HTMLLabelElement> &
	React.LabelHTMLAttributes<HTMLLabelElement> & {
		css?: Interpolation<Theme>;
	};

const SearchLabelButton: React.FC<Props> = (props) => {
	const { t } = useTranslation('common');

	return (
		<label css={props.css} htmlFor={props.htmlFor}>
			<Button icon='search' type='default' text={t('common:btn.search')} />
		</label>
	);
};

export default SearchLabelButton;
