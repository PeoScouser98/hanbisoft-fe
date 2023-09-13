export default function generatePictureByName(name: string) {
	return 'https://ui-avatars.com/api/?name=' + name.trim().replace(/\s/g, ' ').split(' ').join('+');
}
