import useAuth from '@/app/hooks/useAuth';
import { UserRoleEnum } from '@/core/constants/user.const';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RestrictedPermissionLayout(props: React.PropsWithChildren) {
	const { authState } = useAuth();
	return authState.user?.role == UserRoleEnum.ADMIN ? props.children : <Navigate to='/403' />;
}
