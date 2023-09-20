import useDxTheme from '@/common/hooks/useDxTheme';
import React from 'react';
import lightTheme from '@/app/styles/dx.light.css?url';
import darkTheme from '@/app/styles/dx.dark.css?url';

export default function PredefineTheme({ children }: React.PropsWithChildren) {
	const { currentTheme } = useDxTheme();
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		(async () => {
			switch (currentTheme) {
				case 'light':
					await import(lightTheme /* @vite-ignore */);
					break;
				case 'dark':
					await import(darkTheme /* @vite-ignore */);
					break;
				default:
					await import(lightTheme /* @vite-ignore */);
					break;
			}
			setLoading(false);
		})();
	}, [currentTheme]);

	return loading ? null : children;
}
