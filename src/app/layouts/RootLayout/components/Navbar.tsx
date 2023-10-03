import useAuth from '@/common/hooks/useAuth';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import styled from '@emotion/styled';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { DropDownButton } from 'devextreme-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar: React.FunctionComponent = () => {
	const { t, i18n } = useTranslation('common');
	const { signout, user } = useAuth();
	const { handleOpenPage } = usePageNavigate();

	const profileSettings = React.useMemo(
		() => [
			{
				id: 1,
				name: t('actions.profile'),
				icon: 'user',
				onClick: () =>
					handleOpenPage({
						id: '0',
						locale: 'actions.profile',
						path: '/profile',
						text: t('actions.profile'),

						canClose: true,
						canReorder: true
					})
			},
			{
				id: 2,
				name: t('common:actions.sign_out'),
				icon: 'return',
				onClick: signout
			}
		],
		[t, i18n.language]
	);

	return (
		<Header>
			<NavLinkLogo to='/' className='dx-theme-text-color'>
				<MicrosoftIcon css={{ fontSize: '18px' }} /> Hanbisoft
			</NavLinkLogo>

			<StyledDropdownButton
				splitButton={false}
				useSelectMode={false}
				text={user?.display_name}
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
	height: 2.5rem;
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
		width: 28px;
		height: 28px;
		aspect-ratio: 1;
	}
`;

const NavLinkLogo = styled(Link)`
	text-decoration: none;
	align-self: center;
	font-size: 16px;
	font-weight: 600;
	display: inline-flex;
	align-items: center;
	gap: 4px;
	& i.dx-icon-mediumiconslayout {
		font-size: inherit;
	}
`;

export default React.memo(Navbar);
