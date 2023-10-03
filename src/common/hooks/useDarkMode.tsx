import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { setTheme } from '@/app/store/reducers/theme.reducer';
import { TBaseTheme } from 'devextreme/ui/themes';
import themes from 'devextreme/ui/themes';
import { refreshTheme } from 'devextreme/viz/themes';
import React from 'react';

export default function useDarkMode() {
	const currentTheme = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	const changeTheme = React.useCallback((theme: TBaseTheme) => {
		dispatch(setTheme(theme));
		themes.current(theme);
		themes.ready(refreshTheme);
	}, []);

	React.useEffect(() => {
		themes.current(currentTheme.value);
	}, []);

	return {
		isDarkMode: currentTheme.mode === 'dark',
		isLightMode: currentTheme.mode === 'light',
		currentTheme,
		changeTheme
	};
}
