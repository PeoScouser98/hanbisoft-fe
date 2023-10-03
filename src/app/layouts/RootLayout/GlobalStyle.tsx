import { Global, css } from '@emotion/react';

export default function GlobalStyles() {
	return <Global styles={styles} />;
}

const styles = css`
	* {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		box-sizing: border-box;
	}
	body {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
	}

	:root {
		--tracking-tight: -0.025em --tracking-normal: 0;
		--tracking-wide: 0.025em;
	}
`;
