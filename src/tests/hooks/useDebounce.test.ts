import useDebounce from '@/common/hooks/useDebounce';
import { renderHook, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

test('Should exec function after timeout end', async () => {
	const logger = (message) => {
		console.log(message);
		return message;
	};
	const { result } = renderHook(() => useDebounce(logger, 500));
	const spy = vi.spyOn(result, 'current').mockImplementation(() => logger('Hello'));
	expect(result.current('Hello')).toBe('Hello');
	expect(spy).toHaveBeenCalledOnce();
});
