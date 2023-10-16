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
			accent: {
				light: string;
				dark: string;
			};
			success: {
				light: string;
				dark: string;
			};
			danger: {
				light: string;
				dark: string;
			};
			warning: {
				light: string;
				dark: string;
			};
			shadow: {
				light: string;
				dark: string;
			};
			disabled: {
				light: string;
				dark: string;
			};
		};
		breakpoints: {
			mobile: string;
			tablet: string;
			desktop: string;
		};
	}
}
