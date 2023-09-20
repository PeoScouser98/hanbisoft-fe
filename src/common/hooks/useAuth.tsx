import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSigninMutation } from '../../app/store/api/auth.api';
import { useAppDispatch, useAppSelector } from '../../app/store/hook';
import { signout } from '../../app/store/reducers/auth.reducer';

/**
 * @description Provides auth actions (signin/signout), and get user state
 */
export default function useAuth() {
	const authState = useAppSelector((state) => state.auth);
	const [signinMutation, { isLoading, isError }] = useSigninMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignin = useCallback(async (payload: Pick<IUser, 'email' | 'password'>) => {
		try {
			const { data, message } = await signinMutation(payload).unwrap();
			window.localStorage.setItem('access_token', data?.accessToken);
			toast.success(message || 'Signed in');
			navigate('/');
			return { data: data, isLoading, isError };
		} catch (error) {
			toast.error(error.data?.message);
		}
	}, []);

	const handleSignout = useCallback(() => {
		dispatch(signout());
		window.localStorage.removeItem('access_token');
		toast.success(`You've signed out!`);
	}, []);

	return { authState, signin: handleSignin, signout: handleSignout };
}
