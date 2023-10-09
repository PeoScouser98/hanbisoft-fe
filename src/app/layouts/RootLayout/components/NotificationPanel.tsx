import styled from '@emotion/styled';
import clsx from 'clsx';
import { List } from 'devextreme-react';
import moment from 'moment';
import React from 'react';

type Props = { open: boolean; onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> };

const NotificationPanel: React.FunctionComponent<Props> = ({ open, onOpenStateChange: handleOpenStateChange }) => {
	return (
		<div className='dx-drawer'>
			<Backdrop
				className={clsx('dx-drawer-shader', {
					'dx-state-invisible': !open
				})}
				open={open}
				onClick={() => handleOpenStateChange(!open)}
			/>

			<Panel open={open} className='dx-theme-background-color'>
				<List
					dataSource={[
						{
							title: 'Hello',
							arrivedAt: moment().startOf('hour').fromNow()
						}
					]}
					itemRender={({ data }) => <NotificationItem data={data} />}
				/>
			</Panel>
		</div>
	);
};

const NotificationItem: React.FunctionComponent<{ data: any }> = ({ data }) => {
	return <Flex>{JSON.stringify(data)}</Flex>;
};

const Panel = styled.div<{ open: boolean }>`
	height: calc(100vh - 3rem);
	right: 0;
	top: 3rem;
	width: 320px;
	position: fixed;
	z-index: 1000;
	transition: 0.3s ease;
	transform: translateX(${({ open }) => (open ? '0%' : '100%')});
`;

const Flex = styled.div`
	display: flex;
	align-items: start;
	gap: 1rem;
	width: 100%;
`;

const Backdrop = styled.div<{ open: boolean }>`
	height: calc(100vh - 3rem);
	width: 100%;
	top: 3rem;
	transition: opacity 1s ease;
`;

export default NotificationPanel;
