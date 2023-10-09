import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 8px;
	align-items: stretch;
	flex-direction: column;
`;

const SearchBox = React.memo(styled.form`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	row-gap: 4px;
	column-gap: 8px;
	padding: 4px;

	@media (${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: repeat(3, 1fr);
	}
	& button[type='submit'] {
		display: none;
	}
`);

const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: stretch;
	gap: 4px;
`;

const SearchSubmitLabel = styled.label`
	display: inline-flex;
	align-items: start;
	padding: 0;
	gap: 4px;
	& .MuiSvgIcon-root {
		font-size: 16px;
	}
`;

export { ButtonGroup, Container, SearchBox, SearchSubmitLabel };
