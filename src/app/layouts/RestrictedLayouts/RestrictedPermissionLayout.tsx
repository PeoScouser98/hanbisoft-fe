import useAuth from '@/common/hooks/useAuth';
import { UserRoleEnum } from '@/common/constants/_app.const';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RestrictedPermissionLayout(props: React.PropsWithChildren) {
	const { user } = useAuth();
	return [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN].some((role) => role === user?.role) ? (
		props.children
	) : (
		<Navigate to='/403' />
	);
}
