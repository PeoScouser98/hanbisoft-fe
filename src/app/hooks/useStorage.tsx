import { useCallback, useState, useEffect } from 'react';

/**
 * @description Get - Set value stored in local storage
 * @param {string} key
 * @param {any} defaultValue
 */
export function useLocalStorage(key: string, defaultValue?: any) {
	return useStorage(key, defaultValue, window.localStorage);
}

/**
 * @description Get - Set value stored in session storage
 * @param {string} key
 * @param {any} defaultValue
 */
export function useSessionStorage(key: string, defaultValue: any) {
	return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key: string, defaultValue: any, storageObject: Storage): [any, React.Dispatch<any>, () => void] {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);

		if (typeof defaultValue === 'function') {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
}
