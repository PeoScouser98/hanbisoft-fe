import ButtonList, { TButtonListProps } from '@/common/components/Buttons/ButtonGroup';
import LabelButton, { TLabelButtonProps } from '@/common/components/Buttons/LabelButton';
import styled from '@emotion/styled';
import { Box } from 'devextreme-react';
import { Item } from 'devextreme-react/box';
import Button, { IButtonOptions } from 'devextreme-react/button';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AccessManagementPanel: React.FunctionComponent = () => {
	const { t, i18n } = useTranslation(['common']);
	const buttons = React.useMemo<TButtonListProps['items']>(
		() => [
			{
				component: LabelButton,
				props: { type: 'default', icon: 'search', text: t('common:btn.search') }
			},
			{
				component: Button,
				props: {
					type: 'success',
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
			}
		],
		[i18n.language]
	);

	return (
		<Container>
			<Box
				items={buttons}
				direction='row'
				align='center'
				width={500}
				crossAlign='start'
				itemRender={(data) => {
					return (
						<Item ratio={1}>
							<data.component {...data.props} />
						</Item>
					);
				}}
			/>
			<ButtonList items={buttons} />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	align-items: stretch;
`;

export default AccessManagementPanel;
