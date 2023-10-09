import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { setTheme } from '@/app/store/reducers/theme.reducer';
import themes from 'devextreme/ui/themes';
import { refreshTheme } from 'devextreme/viz/themes';
import React from 'react';
import { useLocalStorage } from './useStorage';

declare type TBaseTheme = 'generic.light' | 'generic.dark';

export default function useDxTheme() {
	const currentTheme = useAppSelector((state) => state.theme);
	const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'generic.light');
	const dispatch = useAppDispatch();

	const changeTheme = React.useCallback((theme: TBaseTheme) => {
		dispatch(setTheme(theme));
		themes.current(theme);
		themes.ready(refreshTheme);
		setStoredTheme(theme);
	}, []);

	return {
		currentTheme: storedTheme,
		mode: currentTheme.mode,
		changeTheme
	};
}
