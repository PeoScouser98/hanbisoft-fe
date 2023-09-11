import React from 'react';
import { useLocalStorage } from './useStorage';

export default function useSwitchTheme() {
	const [currentTheme, setCurrentTheme] = useLocalStorage('dx-theme', null);

	const handleSetTheme = (theme: 'light' | 'dark') => {
		console.log(theme);
		const styleSheetSource = theme === 'light' ? './src/styles/dx.light.css' : './src/styles/dx.dark.css';
		// Remove the previous theme CSS
		const previousThemeLink = document.head.querySelector('link[href*="dx."]');
		if (previousThemeLink) {
			previousThemeLink.remove();
		}

		// Add the new theme CSS
		const themeLink = document.createElement('link');
		themeLink.rel = 'stylesheet';
		themeLink.href = styleSheetSource;

		themeLink.dataset.active = Boolean(true).toString();
		document.head.appendChild(themeLink);
	};

	const switchTheme = React.useCallback((theme: 'light' | 'dark') => {
		handleSetTheme(theme);
		setCurrentTheme(theme); // Update the current theme in the state
	}, []);

	// React.useEffect(() => {
	// 	handleSetTheme(currentTheme);
	// }, [currentTheme]);

	return { currentTheme, switchTheme };
}
