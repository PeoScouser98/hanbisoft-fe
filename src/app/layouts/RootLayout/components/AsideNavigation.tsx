import navigation from '@/app/configs/navigation.config';
import usePageNavigate from '@/app/hooks/usePageNavigate';
import { useAppSelector } from '@/app/store/hook';
import { INavigation } from '@/core/types/navigation';
import { ScrollView, TextBox, TreeView } from 'devextreme-react';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import React from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';

const AsideNavigation = () => {
	const { handleOpenPage } = usePageNavigate();
	const { currentPage } = useAppSelector((state) => state.pages);
	const [searchValue, setSearchValue] = React.useState<string>('');

	const treeViewDataSource = React.useMemo(
		() => navigation.map((item) => ({ ...item, selected: item.id === currentPage.id })),
		[currentPage]
	);

	const handleItemClick = React.useCallback(
		(itemData: ItemClickEvent<INavigation>['itemData']) => {
			if (!itemData?.path) return;

			handleOpenPage({
				id: itemData?.id as string,
				text: itemData?.text as string,
				path: itemData?.path,
				canClose: itemData?.path !== '/',
				canReorder: itemData?.path !== '/'
			});
		},
		[currentPage]
	);

	return (
		<Aside>
			<TextBoxWrapper>
				<SearchBox
					mode='search'
					placeholder='Search ...'
					focusStateEnabled={false}
					hoverStateEnabled={false}
					stylingMode='filled'
					valueChangeEvent='input'
					showClearButton
					onValueChange={(value) => setSearchValue(value)}
					style={{ color: '#ffff' }}
				/>
			</TextBoxWrapper>
			<TreeviewWrapper>
				<ScrollView showScrollbar='onScroll'>
					<StyledTreeView
						items={navigation}
						expandNodesRecursive={false}
						focusStateEnabled={false}
						dataStructure='plain'
						searchMode='contains'
						expandIcon='chevronright'
						collapseIcon='chevrondown'
						searchTimeout={500}
						searchValue={searchValue}
						dataSource={treeViewDataSource}
						keyExpr='id'
						displayExpr='text'
						searchExpr={['text', 'path']}
						selectedExpr='selected'
						selectedIndex={treeViewDataSource.findIndex((node) => node.selected)}
						onItemClick={({ itemData }) => handleItemClick(itemData)}
						selectionMode='single'
					/>
				</ScrollView>
			</TreeviewWrapper>
		</Aside>
	);
};

const StyledTreeView = styled(TreeView)`
	& .dx-treeview-item-content {
		font-size: 16px;
		font-weight: 500;
		line-height: 32px;
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

const TextBoxWrapper = styled.div.attrs({ className: 'dx-theme-accent-as-background-color' })`
	width: 100%;
	flex-basis: 3rem;
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

const Aside = styled.aside.attrs({ className: 'dx-theme-background-color-active' })`
	height: 100%;
	width: 320px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	box-shadow: 8px 0 16px #ccc;
`;

const TreeviewWrapper = styled.div.attrs({ className: 'dx-theme-border-color' })`
	flex: 1;
	border-right-width: 1px;
	border-right-style: solid;
	padding: 8px;
`;

export default React.memo(AsideNavigation);
