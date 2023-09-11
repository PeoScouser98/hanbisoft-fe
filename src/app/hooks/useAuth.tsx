import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSigninMutation } from '../store/api/auth.api';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { signout } from '../store/reducers/auth.reducer';
import { RootState } from '../store/type';
import { IUser } from '@/core/types/user';

/**
 * @description Provides auth actions (signin/signout), and get user state
 */

export default function useAuth() {
	const authState = useAppSelector((state: RootState) => state.auth);
	const [signinMutation, { isLoading, isError }] = useSigninMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignin = async (payload: Pick<IUser, 'email' | 'password'>) => {
		const data = await signinMutation(payload);
		navigate('/');
		toast.success('Signin successfully !');
		return { data, isLoading, isError };
	};

	const handleSignout = useCallback(() => {
		dispatch(signout());
		toast.info(`You've signed out!`);
	}, []);

	return { authState, signin: handleSignin, signout: handleSignout };
}
