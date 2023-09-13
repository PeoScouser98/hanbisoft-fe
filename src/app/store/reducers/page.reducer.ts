import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: {
		id: '1',
		text: 'Dashboard',
		path: '/',
		canClose: false,
		canReorder: false
	},

	openingPages: [
		{
			id: '1',
			text: 'Dashboard',
			path: '/',
			canClose: false,
			canReorder: false
		}
	]
};

const pageSlice = createSlice({
	name: 'pages',
	initialState: initialState,
	reducers: {
		openNewPage: (state, action) => {
			return {
				currentPage: action.payload,
				openingPages: [...new Map([...state.openingPages, action.payload].map((item) => [item.id, item])).values()]
			};
		},
		closePage: (state, action) => {
			const currentPageIndex = state.openingPages.findIndex((page) => page.id === state.currentPage.id);
			const openingPages = state.openingPages.filter((page) => page.id !== action.payload.id);
			const currentPage =
				action.payload.id !== state.currentPage.id ? state.currentPage : state.openingPages[currentPageIndex - 1];
			return {
				currentPage,
				openingPages
			};
		},
		reorderPage: (state, action) => {
			if (!action.payload.itemData.canReorder) return state;
			state.openingPages.splice(action.payload.fromIndex, 1);
			state.openingPages.splice(action.payload.toIndex, 0, action.payload.itemData);
			return state;
		}
	}
});

export const { openNewPage, closePage, reorderPage } = pageSlice.actions;

export default pageSlice;
