import { Theme } from '@emotion/react';

const theme: Theme = {
	colors: {
		text: {
			dark: '#f3f4f6',
			light: '#111827'
		},
		border: {
			light: '#d1d5db',
			dark: '#4b5563'
		},
		background: {
			light: '#fff',
			dark: '#1f2937'
		},
		accent: '#6366f1',
		success: '#4ade80',
		warning: '#facc15',
		danger: '#f43f5e',
		shadow: '#9ca3af',
		disabled: '#e5e7eb'
	},
	breakpoints: {
		mobile: '(min-width: 375px) and (max-width: 767px)',
		tablet: '(min-width: 768px) and (max-width: 1365px)',
		desktop: '(min-width: 1368px)'
	}
};

export default theme;
