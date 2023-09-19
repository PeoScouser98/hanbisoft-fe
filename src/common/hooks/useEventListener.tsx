import { useEffect, useRef } from 'react';

/**
 * @description Add event listener to HTML element
 * @param {keyof WindowEventMap} eventType
 * @param {EventListener} callback
 * @param {any} element
 */
export default function useEventListener(
	eventType: keyof WindowEventMap,
	callback: EventListener,
	element: any = window
) {
	const callbackRef = useRef<EventListener>(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (element == null) return;
		const handler = (e: Event) => callbackRef.current(e);
		element.addEventListener(eventType, handler);

		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
}
