import { createSlice } from '@reduxjs/toolkit';

const initialState = 'generic.light';

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (_, { payload }) => {
			return payload;
		}
	}
});

export const { setTheme } = themeSlice.actions;
export default themeSlice;
