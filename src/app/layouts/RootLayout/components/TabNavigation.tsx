import { useAppSelector } from '@/app/store/hook';
import { RootState } from '@/app/store/reduxjs';
import ErrorBoundary from '@/common/components/ErrorBoundary';
import LoadingProgressBar from '@/common/components/Loading/LoadingProgressBar';
import Typography from '@/common/components/Typography';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ScrollView, Sortable, TabPanel } from 'devextreme-react';
import { DragStartEvent } from 'devextreme/ui/sortable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

const TabNavigation = () => {
	const { openingPages, currentPage } = useAppSelector((state: RootState) => state.pages);
	const { handleOpenPage, handleClosePage, handleReorderPage } = usePageNavigate();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	React.useEffect(() => {
		navigate(currentPage.path);
	}, [currentPage]);

	const renderTitle = React.useCallback(
		(page: IPage) => (
			<TabItem onClick={() => handleOpenPage(page)}>
				<Typography variant='p' css={{ width: '85%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
					{t(page?.i18nKey)}
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
	const renderOutlet = React.useCallback(
		() => (
			<ScrollView showScrollbar='onScroll'>
				<OutLetWrapper>
					<React.Suspense fallback={<LoadingProgressBar />}>
						<ErrorBoundary>
							<Outlet />
						</ErrorBoundary>
					</React.Suspense>
				</OutLetWrapper>
			</ScrollView>
		),
		[openingPages, i18n.language]
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
				<StyledTabPanel
					dataSource={openingPages}
					scrollingEnabled
					scrollByContent
					itemTitleRender={renderTitle}
					showNavButtons
					// deferRendering
					hoverStateEnabled={false}
					focusStateEnabled={false}
					repaintChangesOnly={true}
					onTitleClick={({ itemData }) => handleOpenPage(itemData as unknown as IPage)}
					css={css`
						& .dx-tabs-wrapper > .dx-item .dx-tab {
							padding: 0 !important;
						}
					`}
					selectedItem={currentPage}
					itemRender={renderOutlet}
				/>
			</Sortable>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	padding: 16px;
`;

const StyledTabPanel = styled(TabPanel)`
	height: calc(100vh - 8rem);
`;

const TabItem = styled.div`
	position: relative;
	width: 10rem;
	text-align: center;
`;

const CloseButton = styled.i`
	position: absolute;
	top: 0;
	right: 0;
	font-size: 12px !important;
	transition: cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.2s;
	opacity: 0.5;
	&:hover {
		opacity: 1;
	}
`;

const OutLetWrapper = styled.div`
	padding: 1em;
`;

export default TabNavigation;
