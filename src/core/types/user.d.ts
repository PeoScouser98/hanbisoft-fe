export type UserRole = 0 | 1;

export declare interface IUser {
	readonly id: string;
	email: string;
	picture: string;
	readonly password: string;
	displayName: string;
	role: UserRole;
}

export declare type TAuthPayload = {
	user: Omit<IUser, 'password'> | null;
	accessToken: string | null;
	authenticated: boolean;
};
