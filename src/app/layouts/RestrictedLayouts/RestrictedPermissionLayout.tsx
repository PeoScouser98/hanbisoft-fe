import useAuth from '@/common/hooks/useAuth';
import { UserRoleEnum } from '@/common/constants/app.const';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RestrictedPermissionLayout(props: React.PropsWithChildren) {
	const { user } = useAuth();
	// return user.role ? props.children : <Navigate to='/403' />;
	return props.children;
}
