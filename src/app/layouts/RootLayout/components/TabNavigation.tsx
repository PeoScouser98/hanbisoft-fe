import { useAppSelector } from '@/app/store/hook';
import ErrorBoundary from '@/common/components/ErrorBoundary';
import LoadingProgressBar from '@/common/components/Loading/LoadingProgressBar';
import Typography from '@/common/components/Typography';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import useScreenSize from '@/common/hooks/useScreenSize';
import { useSessionStorage } from '@/common/hooks/useStorage';
import { IPage } from '@/types/global';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ScrollView, Sortable, TabPanel } from 'devextreme-react';
import { DragStartEvent } from 'devextreme/ui/sortable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

const defaultProps = {
	scrollingEnabled: true,
	scrollByContent: true,
	showNavButtons: true,
	repaintChangesOnly: true,
	hoverStateEnabled: false,
	focusStateEnabled: false,
	deferRendering: false,
	activeStateEnabled: true,
	keyExpr: 'id'
};

const TabNavigation: React.FunctionComponent = () => {
	const { openingPages, currentPage } = useAppSelector((state) => state.pages);
	const { handleOpenPage, handleClosePage, handleReorderPage } = usePageNavigate();
	const screenSize = useScreenSize();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const tabPanelHeight = React.useMemo(() => screenSize.height - 128, [screenSize.height]);

	React.useEffect(() => {
		navigate(currentPage.path);
	}, [currentPage]);

	const renderTitle = React.useCallback(
		(page: IPage) => (
			<TabItem onClick={() => handleOpenPage(page)}>
				<Typography
					variant='small'
					css={{
						width: '85%',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						fontSize: '12px',
						lineHeight: 'auto'
					}}>
					{t(page?.locale)}
				</Typography>
				{page?.canClose && (
					<CloseButton
						className='dx-icon-close'
						onClick={(e) => {
							e.stopPropagation();
							handleClosePage(page);
						}}
					/>
				)}
			</TabItem>
		),
		[i18n.language]
	);

	const handleTabDragStart = React.useCallback((e: DragStartEvent) => {
		if (e.itemData?.canReorder === false) return false;
		e.itemData = e.fromData[e.fromIndex];
	}, []);

	return (
		<Container>
			<Sortable
				filter='.dx-tab'
				data={openingPages}
				itemOrientation='horizontal'
				dragDirection='horizontal'
				onDragStart={handleTabDragStart}
				onReorder={(e) => {
					handleReorderPage({ fromIndex: e.fromIndex, toIndex: e.toIndex, itemData: e.fromData[e.fromIndex] });
				}}>
				<TabPanel
					{...defaultProps}
					height={tabPanelHeight}
					dataSource={openingPages}
					selectedIndex={openingPages.indexOf(currentPage)}
					scrollByContent
					itemTitleRender={renderTitle}
					showNavButtons
					scrollingEnabled
					keyExpr='id'
					onTitleClick={({ itemData }) => handleOpenPage(itemData as unknown as IPage)}
					selectedItem={currentPage}
					itemComponent={TabContent}
					css={css`
						& > * {
							z-index: 1;
						}
						& .dx-tabs-wrapper > .dx-item .dx-tab {
							padding: 0 !important;
						}
					`}
				/>
			</Sortable>
		</Container>
	);
};

const TabContent: React.FunctionComponent = React.memo(() => {
	const [outletContext, setOutletContext] = useSessionStorage('outlet_context', {});
	return (
		<OutLetWrapper>
			<React.Suspense fallback={<LoadingProgressBar />}>
				<ErrorBoundary>
					<Outlet context={{ outletContext, setOutletContext }} />
				</ErrorBoundary>
			</React.Suspense>
		</OutLetWrapper>
	);
});
const Container = styled.div`
	height: 100%;
	padding: 1.5rem;
`;

const TabItem = styled.div`
	position: relative;
	width: 10rem;
	text-align: center;
	padding: 4px;
	font-weight: bold;
	vertical-align: middle;
`;

const CloseButton = styled.i`
	position: absolute;
	top: 0;
	right: 0;
	font-size: 12px !important;
	transition: 0.2s ease-in-out;
	padding: 2px;
	opacity: 0.5;
	&:hover {
		opacity: 1;
	}
`;

const OutLetWrapper = styled.div`
	padding: 0.75rem;
`;

export default TabNavigation;
