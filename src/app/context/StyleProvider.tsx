import { useLocalStorage } from '@/app/hooks/useStorage';
import React, { PropsWithChildren, useEffect } from 'react';

type TStyleContextValue = {
	currentTheme: 'light' | 'dark';
	setCurrentTheme: (theme: 'light' | 'dark') => void;
};

const StyleContext = React.createContext<TStyleContextValue>({ currentTheme: 'light', setCurrentTheme: () => {} });

const StyleProvider = ({ children }: PropsWithChildren) => {
	const [currentTheme, setCurrentTheme] = useLocalStorage('theme', 'light');
	React.useEffect(() => {
		(async () => {
			console.log(currentTheme);
			const isLightTheme = currentTheme === 'light';
			isLightTheme
				? await import('devextreme/dist/css/dx.light.css')
				: await import('devextreme/dist/css/dx.dark.css');
		})();
	}, [currentTheme]);

	return <StyleContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</StyleContext.Provider>;
};

export { StyleContext };
export default StyleProvider;
