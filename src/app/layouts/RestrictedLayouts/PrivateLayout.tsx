import useAuth from '@/common/hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateLayout = ({ children }: React.PropsWithChildren) => {
	const { authenticated } = useAuth();
	return authenticated ? children : <Navigate to='/auth/signin' />;
};

export default React.memo(PrivateLayout);
