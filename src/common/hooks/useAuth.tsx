import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSigninMutation } from '../../app/store/apis/auth.api';
import { useAppDispatch, useAppSelector } from '../../app/store/hook';
import { signout } from '../../app/store/reducers/auth.reducer';
import axiosInstance from '@/app/configs/axios.config';
import { IUser } from '@/types/global';
import { UserRoleEnum } from '../constants/_app.const';

/**
 * @description Provides auth actions (signin/signout), and get user state
 */
export default function useAuth() {
	const { user, authenticated } = useAppSelector((state) => state.auth);
	const [signinMutation] = useSigninMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isSuperAdmin = React.useMemo(() => user?.role === UserRoleEnum.SUPER_ADMIN, [user]);
	const isAdmin = React.useMemo(() => user?.role === UserRoleEnum.ADMIN, [user]);

	const handleSignin = useCallback((payload: Pick<IUser, 'email' | 'password'>) => {
		toast.promise(signinMutation(payload).unwrap(), {
			loading: 'Signing you in ...',
			success: ({ message }) => {
				navigate('/');
				return message;
			},
			error: ({ message }) => {
				return message || 'Failed to sign in';
			}
		});
	}, []);

	const handleSignout = useCallback(() => {
		dispatch(signout());
		axiosInstance.clearToken();
		toast.success(`You've signed out!`);
	}, []);

	return {
		user,
		authenticated,
		isAdmin,
		isSuperAdmin,
		signin: handleSignin,
		signout: handleSignout
	};
}
