import ButtonList, { TButtonListProps } from '@/common/components/Buttons/ButtonGroup';
import StyledDataGrid from '@/common/components/StyledDataGrid';
import useColumnsDef from '@/common/hooks/useColumnsDef';
import styled from '@emotion/styled';
import { Button } from 'devextreme-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import defaultProps from './defaultProps';

const { columns, ...restProps } = defaultProps;

type Props = {};

const CommonCodePanel = (props: Props) => {
	const { t, i18n } = useTranslation(['common']);
	const columnsDef = useColumnsDef(columns, { ns: 'common_codes' });

	const buttons = React.useMemo<TButtonListProps['items']>(() => {
		return [
			{
				component: Button,
				props: {
					type: 'default',
					icon: 'save',
					text: t('common:btn.save')
				}
			},
			{
				component: Button,
				props: {
					type: 'danger',
					icon: 'trash',
					text: t('common:btn.delete')
				}
			},
			{
				component: Button,
				props: {
					type: 'success',
					icon: 'import',
					text: t('common:btn.upload')
				}
			}
		];
	}, [i18n.language]);

	return (
		<Wrapper>
			<form encType='multipart/form-data' css={{ '& *': { display: 'none' } }}>
				<input type='file' name='file' />
				<button type='submit' id=''></button>
			</form>
			<ButtonList items={buttons} />
			<StyledDataGrid columns={columnsDef} {...restProps} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: stretch;
`;

export default CommonCodePanel;
