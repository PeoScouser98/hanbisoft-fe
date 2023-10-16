import React, { PropsWithChildren } from 'react';
import { DefaultUserRoleEnum } from '@/common/constants/app.const';
import useAuth from '@/common/hooks/useAuth';

const AccessibleComponent: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth();
	return [DefaultUserRoleEnum.SUPER_ADMIN, DefaultUserRoleEnum.ADMIN].includes(user.role?.role_cd) ? children : null;
};

export default AccessibleComponent;
