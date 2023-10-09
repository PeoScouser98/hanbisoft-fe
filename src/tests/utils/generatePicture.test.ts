import { expect, test } from 'vitest';
import generatePictureByName from '@/common/utils/generatePicture';

test('Generate random picture by name', () => {
	expect(generatePictureByName('Quang Hiep')).toBe('https://ui-avatars.com/api/?name=Quang+Hiep');
});
