import useAuth from '@/app/hooks/useAuth';
import DxIcon from '@/core/components/DxIcon';
import { DropDownButton } from 'devextreme-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const HeaderNavigation = () => {
	const navigate = useNavigate();
	const {
		signout,
		authState: { user }
	} = useAuth();

	const profileSettings = React.useMemo(
		() => [
			{
				id: 1,
				name: 'Profile',
				icon: 'user',
				onClick: () => navigate('/profile')
			},
			{
				id: 2,
				name: 'Sign out',
				icon: 'return',
				onClick: signout
			}
		],
		[]
	);

	return (
		<Header>
			<NavLinkLogo to='/'>
				<DxIcon type='mediumiconslayout' /> Hanbisoft
			</NavLinkLogo>

			<StyledDropdownButton
				splitButton={false}
				useSelectMode={false}
				text={user?.displayName}
				icon={user?.picture}
				focusStateEnabled={false}
				hoverStateEnabled={false}
				stylingMode='text'
				items={profileSettings}
				displayExpr='name'
				keyExpr='id'
			/>
		</Header>
	);
};

const Header = styled.div`
	padding: 12px 16px;
	height: 3.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledDropdownButton = styled(DropDownButton)`
	& .dx-button-content {
		padding: 0;
		width: fit-content;
		justify-content: flex-end;
	}
	& .dx-button-content > .dx-icon {
		border-radius: 9999px;
		width: 32px;
		height: 32px;
		aspect-ratio: 1;
	}
`;

const NavLinkLogo = styled(Link).attrs({ className: 'dx-theme-text-color' })`
	text-decoration: none;
	align-self: center;
	font-size: 18px;
	font-weight: 600;
`;

export default React.memo(HeaderNavigation);
