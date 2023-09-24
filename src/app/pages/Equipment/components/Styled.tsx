import useDXTheme from '@/common/hooks/useDXTheme';
import styled from '@emotion/styled';
import { DataGrid } from 'devextreme-react';

const Container = styled.div`
	/* overflow: hidden; */
	display: flex;
	justify-content: flex-start;
	gap: 8px;
	align-items: stretch;
	flex-direction: column;
`;

const StyledDataGrid = styled(DataGrid)<{ currentTheme?: string }>`
	& div.dx-datagrid-header-panel {
		position: sticky;
		color: white;
		top: 0;
	}
	& .dx-datagrid-headers.dx-datagrid-nowrap {
		position: sticky;
		background-color: ${({ theme, currentTheme }) => {
			const _theme = currentTheme.replace('generic.', '');
			return theme.colors.accent[_theme];
		}};
		color: white;
		top: 0px;
		text-align: center !important;
	}

	& td[role='columnheader'] {
		text-align: center !important;
	}
`;

const SearchBox = styled.form`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	row-gap: 8px;
	column-gap: 4px;
	padding: 4px;
	& > * {
		min-width: 10rem;
	}
	@media (min-width: 384px) and (max-width: 767px) {
		grid-template-columns: repeat(6, 2fr);
	}
	@media (min-width: 768px) and (max-width: 1365px) {
		grid-template-columns: repeat(6, 4fr);
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

export { Container, StyledDataGrid, SearchBox, ButtonGroup, SearchSubmitLabel };
