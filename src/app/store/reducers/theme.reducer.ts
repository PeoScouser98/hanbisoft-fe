import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 'generic.light', mode: 'light' };

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (_, { payload }) => {
			return { value: payload, mode: payload.replace('generic.', '') };
		}
	}
});

export const { setTheme } = themeSlice.actions;
export default themeSlice;
