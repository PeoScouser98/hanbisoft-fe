import { useAppSelector } from '@/app/store/hook';
import styled from '@emotion/styled';
import { DataGrid } from 'devextreme-react';
import React from 'react';

const StyledDataGrid = styled(DataGrid)`
	& td[role='columnheader'] {
		position: sticky;
		top: 0px;
		text-align: center !important;
		color: white !important;
		background-color: ${({ theme }) => {
			const { mode } = useAppSelector((state) => state.theme);
			return theme.colors.accent[mode];
		}};
	}
`;

export default React.memo(StyledDataGrid);
