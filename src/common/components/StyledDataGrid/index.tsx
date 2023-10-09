import React from 'react';
import styled from '@emotion/styled';
import DataGrid from 'devextreme-react/data-grid';
import useDxTheme from '@/common/hooks/useDxTheme';

const StyledDataGrid = styled(DataGrid)`
	& td[role='columnheader'] {
		position: sticky;
		top: 0px;
		text-align: center !important;
		color: white !important;
		background-color: ${({ theme }) => {
			const { mode } = useDxTheme();
			return theme.colors.accent[mode];
		}};
	}
`;

export default React.memo(StyledDataGrid);
