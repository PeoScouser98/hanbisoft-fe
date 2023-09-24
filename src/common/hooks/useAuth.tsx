import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSigninMutation } from '../../app/store/apis/auth.api';
import { useAppDispatch, useAppSelector } from '../../app/store/hook';
import { signout } from '../../app/store/reducers/auth.reducer';
import axiosInstance from '@/app/configs/axios.config';

/**
 * @description Provides auth actions (signin/signout), and get user state
 */
export default function useAuth() {
	const authState = useAppSelector((state) => state.auth);
	const [signinMutation, { isLoading, isError }] = useSigninMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignin = useCallback((payload: Pick<IUser, 'email' | 'password'>) => {
		toast.promise(signinMutation(payload).unwrap(), {
			loading: 'Signing you in ...',
			success: ({ data, message }) => {
				navigate('/');
				axiosInstance.setAccessToken(data.accessToken);
				return message;
			},
			error: ({ data }) => {
				return data?.message || 'Failed to sign in';
			}
		});
	}, []);

	const handleSignout = useCallback(() => {
		dispatch(signout());
		axiosInstance.clearToken();
		toast.success(`You've signed out!`);
	}, []);

	return { authState, signinStates: { isLoading, isError }, signin: handleSignin, signout: handleSignout };
}
