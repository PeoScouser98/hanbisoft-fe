import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

/**
 * @description Check screen size match with media query
 * @param {string} mediaQuery
 * @example const isLargeScreen = useMediaQuery('(min-width: 1366px)')
 * @returns {boolean}
 */

export default function useMediaQuery(mediaQuery: string) {
	const [isMatch, setIsMatch] = useState<boolean>(false);
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

	useEffect(() => {
		const list = window.matchMedia(mediaQuery);
		setMediaQueryList(list);
		setIsMatch(list.matches);
	}, [mediaQuery]);

	useEventListener('change', (e: MediaQueryListEventInit) => setIsMatch(e.matches!), mediaQueryList);

	return isMatch;
}
