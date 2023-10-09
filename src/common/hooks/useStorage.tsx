import { useCallback, useState, useEffect } from 'react';
function isJSON(data) {
	try {
		return !!JSON.parse(data);
	} catch (error) {
		return false;
	}
}

/**
 * Get - Set value stored in local storage
 * @param {string} key
 * @param {any} defaultValue
 */
export function useLocalStorage(key: string, defaultValue?: any) {
	return useStorage(key, defaultValue, window.localStorage);
}

/**
 * Get - Set value stored in session storage
 * @param {string} key
 * @param {any} defaultValue
 */
export function useSessionStorage(key: string, defaultValue?: any) {
	return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key: string, defaultValue: any, storageObject: Storage): [any, React.Dispatch<any>, () => void] {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObject.getItem(key);
		if (isJSON(jsonValue)) return JSON.parse(jsonValue);

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
