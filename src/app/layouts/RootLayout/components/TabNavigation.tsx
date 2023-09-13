import usePageNavigate from '@/app/hooks/usePageNavigate';
import { useAppSelector } from '@/app/store/hook';
import { RootState } from '@/app/store/type';
import ErrorBoundary from '@/core/components/ErrorBoundary';
import LoadingProgressBar from '@/core/components/Loading/LoadingProgressBar';
import Typography from '@/core/components/Typography';
import { IPage } from '@/core/types/page';
import { ScrollView, Sortable, TabPanel } from 'devextreme-react';
import { DragStartEvent } from 'devextreme/ui/sortable';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const TabNavigation = () => {
	const { openingPages, currentPage } = useAppSelector((state: RootState) => state.pages);
	const { handleOpenPage, handleClosePage, handleReorderPage } = usePageNavigate();
	const navigate = useNavigate();

	// React.useEffect(() => {
	// 	navigate(currentPage.path);
	// }, [currentPage]);

	const renderTitle = React.useCallback(
		(page: IPage) => (
			<TabItem onClick={() => handleOpenPage(page)}>
				<Typography variant='p'>{page?.text}</Typography>
				{openingPages.length >= 2 && page?.canClose && (
					<CloseButton
						onClick={(e) => {
							e.stopPropagation();
							handleClosePage(page);
						}}
					/>
				)}
			</TabItem>
		),
		[openingPages, handleClosePage]
	);
	const renderOutlet = React.useCallback(
		() => (
			<ScrollView showScrollbar='onScroll'>
				<OutLetWrapper>
					<ErrorBoundary>
						<React.Suspense fallback={<LoadingProgressBar />}>
							<Outlet />
						</React.Suspense>
					</ErrorBoundary>
				</OutLetWrapper>
			</ScrollView>
		),
		[]
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
					focusStateEnabled={false}
					hoverStateEnabled={false}
					itemTitleRender={renderTitle}
					showNavButtons
					selectedItem={currentPage}
					repaintChangesOnly={true}
					onSelectedItemChange={(value) => {
						handleOpenPage(value);
					}}
					onSelectedIndexChange={(value) => handleOpenPage(openingPages[value] as unknown as IPage)}
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
	height: calc(100vh - 11.5rem);
`;

const TabItem = styled.div`
	position: relative;
	width: 10rem;
	text-overflow: ellipsis;
	overflow: hidden;
	text-align: left;
	padding: 0 4px;
`;

const CloseButton = styled.i.attrs({ className: 'dx-icon-close' })`
	position: absolute;
	top: 0;
	right: 0;
`;
const OutLetWrapper = styled.div`
	padding: 1em;
`;

export default React.memo(TabNavigation);
