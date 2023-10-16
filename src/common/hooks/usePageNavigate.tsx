import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/hook';
import { closePage, openNewPage, reorderPage } from '../../app/store/reducers/page.reducer';
import { useSessionStorage } from './useStorage';
import { IPage } from '@/types/entities';

/**
 * @description Navigate page
 */

export default function usePageNavigate() {
	const dispatch = useAppDispatch();

	// const [outletContext, setOutletContext] = useSessionStorage('outlet_context');

	const handleOpenPage = React.useCallback((payload: IPage) => {
		// if (!outletContext[payload.id]) setOutletContext({ ...outletContext, [payload.id]: {} });
		dispatch(openNewPage(payload));
	}, []);

	const handleClosePage = React.useCallback((payload: IPage) => {
		// setOutletContext((prev) => {
		// 	delete prev[payload.id];
		// 	return prev;
		// });
		dispatch(closePage(payload));
	}, []);

	const handleReorderPage = React.useCallback((payload: { fromIndex: number; toIndex: number; itemData: IPage }) => {
		dispatch(reorderPage(payload));
	}, []);

	return { handleOpenPage, handleClosePage, handleReorderPage };
}
