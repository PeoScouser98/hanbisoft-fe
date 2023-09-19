import Icon from '@/common/components/DxIcon';
import useAuth from '@/common/hooks/useAuth';
import { DropDownButton } from 'devextreme-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation('common');
	const {
		signout,
		authState: { user }
	} = useAuth();

	const profileSettings = React.useMemo(
		() => [
			{
				id: 1,
				name: t('common:actions.profile'),
				icon: 'user',
				onClick: () => navigate('/profile')
			},
			{
				id: 2,
				name: t('common:actions.sign_out'),
				icon: 'return',
				onClick: signout
			}
		],
		[i18n.language]
	);

	return (
		<Header>
			<NavLinkLogo to='/'>
				<MicrosoftIcon /> Hanbisoft
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
	padding: 8px;
	height: 3rem;
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
	display: inline-flex;
	align-items: center;
	gap: 4px;
	& i.dx-icon-mediumiconslayout {
		font-size: inherit;
	}
`;

export default React.memo(Navbar);
