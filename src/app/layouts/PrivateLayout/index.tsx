import useAuth from '@/app/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateLayout({ children }: React.PropsWithChildren) {
	const { authState } = useAuth();

	return authState.authenticated ? children : <Navigate to='/signin' />;
}
