import React from 'react';

type TFieldControlSize = 'sm' | 'md' | 'lg';

export default function useGetFieldControlSize(size: TFieldControlSize) {
	return React.useMemo(() => {
		switch (size) {
			case 'sm':
				return 20;
			case 'md':
				return 24;
			case 'lg':
				return 28;
			default:
				return 28;
		}
	}, [size]);
}
