import '@/common/utils/stringUtils';
import { expect, test } from 'vitest';

test('Generate random picture by name', () => {
	const str = 'michael owen';
	expect(str.capitalize()).toBe('Michael Owen');
});
