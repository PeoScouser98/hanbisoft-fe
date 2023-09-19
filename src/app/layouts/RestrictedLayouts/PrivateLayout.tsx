import useAuth from '@/common/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateLayout = ({ children }: React.PropsWithChildren) => {
	const { authState } = useAuth();

	return authState.authenticated ? children : <Navigate to='/signin' />;
};

export default React.memo(PrivateLayout);
