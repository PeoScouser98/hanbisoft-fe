import navigation from '@/app/configs/navigation.config';
import { useAppSelector } from '@/app/store/hook';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import { ScrollView, TextBox, TreeView } from 'devextreme-react';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const AsideNavigation = () => {
	const { handleOpenPage } = usePageNavigate();
	const { currentPage } = useAppSelector((state) => state.pages);
	const [searchValue, setSearchValue] = React.useState<string>('');
	const { t, i18n } = useTranslation('common');

	const treeViewDataSource = React.useMemo(
		() =>
			navigation.map((nav) => {
				if (!nav.items)
					return {
						...nav,
						text: t(nav.i18nKey)
					};
				return {
					...nav,
					text: t(nav.text),
					selected: nav.id === currentPage.id,
					items: nav.items.map((childNav) => ({
						...childNav,
						text: t(childNav.i18nKey)
					}))
				};
			}),
		[currentPage, i18n.language]
	);

	const handleItemClick = React.useCallback(
		(itemData: ItemClickEvent<INavigation>['itemData']) => {
			if (!itemData?.path) return;
			handleOpenPage({
				id: itemData?.id as string,
				i18nKey: itemData?.i18nKey as string,
				path: itemData?.path,
				canClose: itemData?.path !== '/',
				canReorder: itemData?.path !== '/'
			});
		},
		[currentPage]
	);

	return (
		<Aside className='dx-theme-background-color'>
			<TextBoxWrapper className='dx-theme-accent-as-background-color'>
				<SearchBox
					mode='search'
					placeholder={'Search ...'}
					focusStateEnabled={false}
					hoverStateEnabled={false}
					stylingMode='filled'
					valueChangeEvent='input'
					showClearButton
					onValueChange={(value) => setSearchValue(value)}
					style={{ color: '#ffff' }}
				/>
			</TextBoxWrapper>
			<StyledScrollView showScrollbar='onScroll' width='100%' className='dx-theme-border-color'>
				<StyledTreeView
					className='panel-list'
					dataSource={treeViewDataSource}
					focusStateEnabled={false}
					dataStructure='plain'
					searchMode='contains'
					expandIcon='chevronright'
					collapseIcon='chevrondown'
					searchTimeout={500}
					searchValue={searchValue}
					keyExpr='id'
					expandNodesRecursive
					expandedExpr='selected'
					displayExpr='text'
					searchExpr={['text', 'path']}
					onItemClick={({ itemData }) => handleItemClick(itemData)}
					selectionMode='single'
				/>
			</StyledScrollView>
		</Aside>
	);
};

const Aside = styled.aside`
	height: 100%;
	width: 320px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	box-shadow: 8px 0 16px #ccc;
`;

const StyledScrollView = styled(ScrollView)`
	flex: 1;
	border-right-width: 1px;
	border-right-style: solid;
	& .dx-scrollable-content {
		padding: 8px;
	}
`;

const StyledTreeView = styled(TreeView)`
	& .dx-treeview-item-content {
		font-size: 16px;
		font-weight: 500;
		line-height: 32px;
		vertical-align: middle;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		white-space: nowrap;
	}
	& .dx-icon {
		line-height: 32px;
		font-size: 16px;
	}
`;

const TextBoxWrapper = styled.div`
	width: 100%;
	flex-basis: 3rem;
	height: fit-content;
`;

const SearchBox = styled(TextBox)`
	height: 100%;
	background-color: transparent;
	& .dx-texteditor-input-container > * {
		color: white;
		background-color: transparent;
	}
	& .dx-icon-search::before {
		color: white !important;
	}
	& .dx-icon-clear::before {
		color: white;
	}
`;

export default React.memo(AsideNavigation);
