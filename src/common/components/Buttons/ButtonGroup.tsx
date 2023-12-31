import styled from '@emotion/styled';
import { TDxIcon } from 'devextreme';
import { IButtonOptions } from 'devextreme-react/button';
import React from 'react';
import { TLabelButtonProps } from './LabelButton';

export type TButtonListProps = {
	items: Array<{
		component: React.ComponentType<IButtonOptions | TLabelButtonProps>;
		props: TLabelButtonProps | (IButtonOptions & { icon: TDxIcon });
	}>;
};

const ButtonList: React.FC<TButtonListProps> = (props) => {
	return (
		<ButtonGroup>
			{Array.isArray(props.items) &&
				props.items.map((item) => <item.component key={crypto.randomUUID()} {...item.props} />)}
		</ButtonGroup>
	);
};

const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 4px;
`;

export default React.memo(ButtonList);
