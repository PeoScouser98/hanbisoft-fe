import { expect, test } from 'vitest';
import generatePictureByName from '@/common/utils/generatePicure';

test('Generate random picture by name', () => {
	expect(generatePictureByName('Quang Hiep')).toBe('https://ui-avatars.com/api/?name=Quang+Hiep');
});
