import { IPage } from '@/core/types/page';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hook';
import { closePage, openNewPage, reorderPage } from '../store/reducers/page.reducer';

/**
 * @description Navigate page
 */

export default function usePageNavigate() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleOpenPage = React.useCallback((payload: IPage) => {
		dispatch(openNewPage(payload));
		navigate(payload.path);
	}, []);

	const handleClosePage = React.useCallback((payload: IPage) => {
		dispatch(closePage(payload));
	}, []);

	const handleReorderPage = React.useCallback((payload: { fromIndex: number; toIndex: number; itemData: IPage }) => {
		dispatch(reorderPage(payload));
	}, []);

	return { handleOpenPage, handleClosePage, handleReorderPage };
}
