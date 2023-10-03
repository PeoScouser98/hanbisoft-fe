import { test, expect } from 'vitest';
import useCookie from '@/common/hooks/useCookie';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

test('Should set and get cookie value', () => {
	const { result } = renderHook(() => useCookie('token', ''));
	act(() => {
		result.current.updateCookie('some_token', null);
	});
	expect(result.current.value).toBe('some_token');
});
