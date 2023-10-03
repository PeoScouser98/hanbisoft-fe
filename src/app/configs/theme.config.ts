import { Theme } from '@emotion/react';

const theme: Theme = {
	colors: {
		text: {
			dark: '#dedede',
			light: '#333333'
		},
		border: {
			light: '#dddddd',
			dark: '#4b5563'
		},
		background: {
			light: '#fff',
			dark: '#2a2a2a'
		},
		accent: {
			light: '#337ab7',
			dark: '#1ca8dd'
		},

		success: { light: '#5cb85c', dark: '#5cb85c' },
		warning: { light: '#f0ad4e', dark: '#f0ad4e' },
		danger: { light: '#d9534f', dark: '#d9534f' },
		shadow: { light: '#9ca3af', dark: '' },
		disabled: { light: '#e5e7eb', dark: '#555555' }
	},
	breakpoints: {
		mobile: '(min-width: 375px) and (max-width: 767px)',
		tablet: '(min-width: 768px) and (max-width: 1365px)',
		desktop: '(min-width: 1368px)'
	}
};

export default theme;
