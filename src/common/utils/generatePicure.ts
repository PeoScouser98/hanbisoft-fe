/**
 * @description Generate avatar by name
 * @param {string} name
 * @returns {string} Picture URL by name
 */
export default function generatePictureByName(name: string) {
	return 'https://ui-avatars.com/api/?name=' + name.trim().replace(/\s/g, ' ').split(' ').join('+');
}
