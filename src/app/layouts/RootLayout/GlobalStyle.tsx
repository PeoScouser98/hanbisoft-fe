import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	* {
      @import url('https://fonts.googleapis.com/css2?family=Inter&family=Noto+Sans+KR&display=swap');
      font-family: 'Noto Sans KR', sans-serif;
      margin: 0;
      box-sizing:border-box
   }
  	body {
		margin: 0;
		padding: 0;
  	}
  
	:root{
		--color-primary:#337ab7;
		--color-success: #5cb85c;

		--tracking-tight: -.025em
		--tracking-normal: 0;
		--tracking-wide: .025em

	}
`;

export default GlobalStyles;
