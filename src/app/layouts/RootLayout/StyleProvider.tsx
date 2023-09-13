import useDxTheme from '@/app/hooks/useDxTheme';
import React from 'react';

export default function StyleProvider({ children }: React.PropsWithChildren) {
	const { currentTheme } = useDxTheme();
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const loadStyleSheet = async () => {
			switch (currentTheme) {
				case 'light':
					await import('@/themes/dx.light.css');
					break;
				case 'dark':
					await import('@/themes/dx.dark.css');
					break;
				default:
					await import('@/themes/dx.light.css');
					break;
			}
			setIsLoading(false);
		};
		return () => {
			loadStyleSheet();
		};
	}, [currentTheme]);

	return isLoading ? null : children;
}
