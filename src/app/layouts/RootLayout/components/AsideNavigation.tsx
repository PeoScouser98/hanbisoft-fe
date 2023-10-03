import navigation from '@/app/configs/navigation.config';
import { useAppSelector } from '@/app/store/hook';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import { TNavigation } from '@/types/global';
import styled from '@emotion/styled';
import { TextBox, TreeView } from 'devextreme-react';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AsideNavigation: React.FunctionComponent = () => {
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
		[currentPage, i18n.language, t]
	);

	const handleItemClick = React.useCallback(
		(itemData: ItemClickEvent<TNavigation>['itemData']) => {
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

			<StyledTreeView
				width={288}
				scrollDirection='both'
				className='dx-theme-border-color'
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
		</Aside>
	);
};

const Aside = styled.aside`
	height: 100%;
	width: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	box-shadow: 8px 0 16px #ccc;
`;

const StyledTreeView = styled(TreeView)`
	border-right-width: 1px;
	border-right-style: solid;
	padding: 8px 8px 8px 0;
	& .dx-treeview-item-content {
		height: 2rem;
		font-size: 1rem;
		line-height: 2rem;
		vertical-align: middle;
		overflow: hidden;
		font-weight: normal;
		text-overflow: ellipsis;
		width: 100%;
		white-space: nowrap;
		& .dx-icon {
			font-size: 20px !important;
			margin-right: 0.75em;
		}
	}
	& .dx-treeview-node.dx-treeview-item-without-checkbox.dx-treeview-item-with-custom-expander-icon {
		padding-left: 8px !important;
	}

	& .dx-treeview-custom-expand-icon,
	& .dx-treeview-custom-collapse-icon {
		top: 0;
		bottom: auto;
		right: 1rem;
		left: auto;
		font-size: 1rem;
		vertical-align: middle;
		font-size: 1rem;
		top: 14px;
	}
`;

const TextBoxWrapper = styled.div`
	height: fit-content;
	flex-basis: content;
`;

const SearchBox = styled(TextBox)`
	height: 2rem;
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
