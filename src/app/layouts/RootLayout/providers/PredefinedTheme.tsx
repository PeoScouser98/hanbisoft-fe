import useDxTheme from '@/common/hooks/useDxTheme';
import React from 'react';

const PredefineTheme = ({ children }: React.PropsWithChildren) => {
	const { currentTheme } = useDxTheme();
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		(async () => {
			switch (currentTheme) {
				case 'light':
					await import('@/app/styles/dx.light.css');
					break;
				case 'dark':
					await import('@/app/styles/dx.dark.css');
					break;
				default:
					await import('@/app/styles/dx.light.css');
					break;
			}
			setLoading(false);
		})();
	}, [currentTheme]);

	return loading ? null : children;
};

export default React.memo(PredefineTheme);
