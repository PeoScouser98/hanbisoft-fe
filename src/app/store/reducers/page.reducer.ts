import { IPage } from '@/core/types/page';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: {
		id: '1',
		text: 'Dashboard',
		path: '/',
		canClose: false,
		fixed: true
	},

	openingPages: [
		{
			id: '1',
			text: 'Dashboard',
			path: '/',
			canClose: false,
			fixed: true
		}
	]
};

const pageSlice = createSlice({
	name: 'pages',
	initialState: initialState,
	reducers: {
		openNewPage: (state, action: PayloadAction<IPage>) => {
			return {
				currentPage: action.payload,
				openingPages: [...new Map([...state.openingPages, action.payload].map((item) => [item.id, item])).values()]
			};
		},
		closePage: (state, action: PayloadAction<IPage>) => {
			const currentPageIndex = state.openingPages.findIndex((page) => page.id === state.currentPage.id);
			const openingPages = state.openingPages.filter((page) => page.id !== action.payload.id);
			const currentPage =
				action.payload.id !== state.currentPage.id ? state.currentPage : state.openingPages[currentPageIndex - 1];
			return {
				currentPage,
				openingPages
			};
		},
		reorderPage: (state, action: PayloadAction<{ fromIndex: number; toIndex: number; itemData: IPage }>) => {
			const newOrderingOpeningPages = [...state.openingPages];
			newOrderingOpeningPages.splice(action.payload.fromIndex, 1);
			newOrderingOpeningPages.splice(action.payload.toIndex, 0, action.payload.itemData);
			return {
				...state,
				openingPages: newOrderingOpeningPages
			};
		}
	}
});

export const { openNewPage, closePage, reorderPage } = pageSlice.actions;

export default pageSlice;
