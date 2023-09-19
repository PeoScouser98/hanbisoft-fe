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

	:root{
		--tracking-tight: -0.025em
		--tracking-normal: 0;
		--tracking-wide: .025em

	}
`;

export default GlobalStyles;
