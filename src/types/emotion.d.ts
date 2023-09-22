import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			text: {
				dark: string;
				light: string;
			};
			border: {
				dark: string;
				light: string;
			};
			background: {
				dark: string;
				light: string;
			};
			accent: string;
			success: string;
			danger: string;
			warning: string;
			shadow: string;
			disabled: string;
		};
		breakpoints: {
			mobile: string;
			tablet: string;
			desktop: string;
		};
	}
}
declare module '@emotion/styled';
