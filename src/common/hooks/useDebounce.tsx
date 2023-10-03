import { useRef } from 'react';

export default function useDebounce(callback: (...args) => any, timeout: number) {
	const timerId = useRef(null);
	timeout = timeout || 0;
	return (...args) => {
		if (timerId.current) {
			clearTimeout(timerId.current);
			timerId.current = null;
		}
		timerId.current = setTimeout(() => {
			callback(...args);
		}, timeout);
	};
}

// export default function useDebounce(callback: () => void, delay: number, dependencies: DependencyList = []) {
// 	const { reset, clear } = useTimeout(callback, delay);
// 	useEffect(reset, [...dependencies!, reset]);
// 	useEffect(clear, []);
// }
