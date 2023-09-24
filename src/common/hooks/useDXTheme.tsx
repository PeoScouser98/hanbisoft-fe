import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { setTheme } from '@/app/store/reducers/theme.reducer';
import themes from 'devextreme/ui/themes';
import { refreshTheme } from 'devextreme/viz/themes';
import React from 'react';

export default function useDXTheme() {
	const currentTheme = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	const changeTheme = React.useCallback((theme: DataTheme) => {
		dispatch(setTheme(theme));
		themes.current(theme);
		themes.ready(refreshTheme);
	}, []);

	return {
		currentTheme,
		changeTheme
	};
}
