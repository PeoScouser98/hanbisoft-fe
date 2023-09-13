import { IPage } from '@/core/types/page';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { closePage, openNewPage, reorderPage } from '../store/reducers/page.reducer';
import { useNavigate } from 'react-router-dom';

/**
 * @description Navigate page
 */

export default function usePageNavigate() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { openingPages: pages, currentPage } = useAppSelector((state) => state.pages);

	const handleOpenPage = React.useCallback((payload: IPage) => {
		dispatch(openNewPage(payload));
		navigate(payload.path);
	}, []);

	const handleClosePage = (payload: IPage) => {
		const openingPages = pages;
		const currentPageIndex = pages.findIndex((page) => page.id === currentPage.id);
		const pageToNavigate = payload.id !== currentPage.id ? currentPage : openingPages[currentPageIndex - 1];
		navigate(pageToNavigate.path);
		dispatch(closePage(payload));
	};

	const handleReorderPage = React.useCallback(
		(payload: { fromIndex: number; toIndex: number; itemData: IPage }) => dispatch(reorderPage(payload)),
		[]
	);

	return { handleOpenPage, handleClosePage, handleReorderPage };
}
