export enum UserRoleEnum {
	SUPER_ADMIN = 0,
	ADMIN = 1,
	USER = 2
}

export const ROLE_MAP = new Map([
	[1, 'Admin'],
	[2, 'Member']
]);
