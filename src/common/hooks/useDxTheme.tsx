import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hook';
import { setTheme } from '../../app/store/reducers/theme.reducer';
import darkStyleSource from '@/styles/dx.dark.css?url';
import lightStyleSource from '@/styles/dx.light.css?url';
console.log(lightStyleSource);

export default function useDxTheme() {
	const currentTheme = useAppSelector((state) => state.themes);
	const dispatch = useAppDispatch();

	const handleSetTheme = (theme: 'light' | 'dark') => {
		const styleSheetSource = theme === 'light' ? lightStyleSource : darkStyleSource;
		// Remove the previous theme CSS
		const previousThemeLink = document.head.querySelector('link[href*="dx."]');
		if (previousThemeLink) {
			previousThemeLink.remove();
		}

		// Add the new theme CSS
		const themeLink = document.createElement('link');
		themeLink.rel = 'stylesheet';
		// themeLink.type = 'text/css';
		themeLink.href = styleSheetSource;
		themeLink.dataset.active = 'true';
		themeLink.dataset.theme = theme;
		document.head.appendChild(themeLink);
	};

	React.useEffect(() => {
		handleSetTheme(currentTheme);
	}, [currentTheme]);

	return {
		currentTheme: currentTheme as 'dark' | 'light',
		switchTheme: (theme: 'dark' | 'light') => dispatch(setTheme(theme))
	};
}
