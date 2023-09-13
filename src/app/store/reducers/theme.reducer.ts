import { createSlice } from '@reduxjs/toolkit';

const initialState: 'dark' | 'light' = 'light';

const themeSlice = createSlice({
	name: 'themes',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state = action.payload;
			return state;
		}
	}
});

export const { setTheme } = themeSlice.actions;
export default themeSlice;
