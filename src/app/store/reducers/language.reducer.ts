import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
	name: 'languages',
	initialState: [
		{
			id: 1,
			value: 'en',
			text: 'English',
			used: true
		},
		{
			id: 2,
			value: 'kr',
			text: 'Korean',
			used: false
		}
	],
	reducers: {
		setLanguage: (state, action: PayloadAction<number>) => {
			return state.map((lang) => ({ ...lang, used: lang.id === action.payload }));
		}
	}
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice;
