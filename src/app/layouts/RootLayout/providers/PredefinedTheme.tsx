import useDxTheme from '@/common/hooks/useDxTheme';
import React from 'react';

export default function PredefineTheme({ children }: React.PropsWithChildren) {
	const { currentTheme } = useDxTheme();
	const [loading, setLoading] = React.useState<boolean>(true);
	// const { loading, handleImport } = useDynamicImport();

	React.useEffect(() => {
		(async () => {
			switch (currentTheme) {
				case 'light':
					await import('@/styles/dx.light.css');
					break;
				case 'dark':
					await import('@/styles/dx.dark.css');
					break;
				default:
					await import('@/styles/dx.light.css');
					break;
			}
			setLoading(false);
		})();
	}, [currentTheme]);

	return loading ? null : children;
}
