import styled from '@emotion/styled';

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 8px;
	align-items: stretch;
	flex-direction: column;
`;

const SearchBox = styled.form`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 8px;
	column-gap: 4px;
	row-gap: 8px;
	padding: 4px;

	@media (${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: repeat(2, 2fr);
	}
	@media (${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: repeat(3, 4fr);
	}
	& button[type='submit'] {
		display: none;
	}
`;

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
