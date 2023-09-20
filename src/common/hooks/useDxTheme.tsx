import React from 'react';
import themes from 'devextreme/ui/themes';
import { refreshTheme, currentTheme } from 'devextreme/viz/themes';
import { useLocalStorage } from './useStorage';

export default function useDXTheme() {
	const [theme, setTheme] = useLocalStorage('theme', currentTheme());

	const changeTheme = React.useCallback((theme: DataTheme) => {
		setTheme(theme);
		themes.current(theme);
		themes.ready(refreshTheme);
	}, []);

	React.useEffect(() => {
		themes.current(theme);
	}, []);

	return {
		currentTheme: theme,
		changeTheme
	};
}
