import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
		font-family: 'Roboto', sans-serif;
      margin: 0;
      box-sizing:border-box
   }
  	body {
		margin: 0;
		padding: 0;
  	}
  @font-face {
	font-family: DXIcons;
	src:
		local('DevExtreme Generic Icons'),
		local('devextreme_generic_icons'),
		url('/src/themes/icons/dxicons.woff2') format('woff2'),
		url('/src/themes/icons/dxicons.woff') format('woff'),
		url('/src/themes/icons/dxicons.ttf') format('truetype');
	font-weight: 400;
	font-style: normal;
}
	:root{
		--tracking-tight: -0.025em
		--tracking-normal: 0;
		--tracking-wide: .025em

	}
`;

export default GlobalStyles;
