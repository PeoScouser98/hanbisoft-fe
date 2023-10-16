import Swap from '@/common/components/Swap';
import Typography from '@/common/components/Typography';
import useAuth from '@/common/hooks/useAuth';
import useDxTheme from '@/common/hooks/useDxTheme';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { Button, DropDownButton, Tooltip } from 'devextreme-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = { open: boolean; onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> };

const notification = [
	{
		title: 'Signed in successfully',
		description: `You've signed in at - ${new Date().toLocaleDateString()}`
	}
];

const Navbar: React.FC<Props> = ({ open, onOpenStateChange: handleOpenStateChange }) => {
	const { t, i18n } = useTranslation('common');
	const { signout, user } = useAuth();
	const { handleOpenPage } = usePageNavigate();
	const theme = useTheme();
	const { changeTheme, mode } = useDxTheme();

	const handleChangeTheme = React.useCallback((checked: boolean) => {
		checked ? changeTheme('generic.light') : changeTheme('generic.dark');
	}, []);

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
		<Header className='dx-theme-background-color dx-theme-border-color'>
			<NavLinkLogo to='/' className='dx-theme-text-color'>
				<MicrosoftIcon css={{ fontSize: '18px' }} /> Hanbisoft
			</NavLinkLogo>
			<Flex>
				<div>
					<Tooltip
						css={{ zIndex: 9999 }}
						target='#theme-toggle'
						position='left'
						showEvent='mouseenter'
						hideEvent='mouseleave'
						contentRender={() => <Typography variant='p'>{t(`actions.use_${mode}_mode`)}</Typography>}
					/>
					<Swap
						id='theme-toggle'
						swapOn={<LightModeIcon css={{ fontSize: '20px' }} />}
						swapOff={<DarkModeIcon css={{ fontSize: '20px' }} />}
						checked={mode === 'light'}
						onChange={(e) => handleChangeTheme(e.target.checked)}
					/>
				</div>
				<BadgeButtonContainer>
					{notification.length > 0 && (
						<Badge css={{ backgroundColor: theme.colors.danger.light }}>{notification.length}</Badge>
					)}
					<Button
						focusStateEnabled={false}
						icon='bell'
						stylingMode='text'
						onClick={() => handleOpenStateChange(!open)}
						css={{ borderRadius: '9999px', padding: '4px', '& .dx-icon': { fontSize: '18px !important' } }}
					/>
				</BadgeButtonContainer>
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
			</Flex>
		</Header>
	);
};

const Header = styled.div`
	padding: 8px;
	height: 3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	box-shadow: 0 4px 12px #222222;
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
	font-size: 14px;
	font-weight: 600;
	display: inline-flex;
	align-items: center;
	gap: 4px;
	& i.dx-icon-mediumiconslayout {
		font-size: inherit;
	}
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const BadgeButtonContainer = styled.div`
	position: relative;
`;
const Badge = styled(Typography)`
	position: absolute;
	top: 0;
	right: 0;
	transform: translateX(6px);
	z-index: 99;
	user-select: none;
	width: 1.15rem;
	height: 1.15rem;
	border-radius: 100%;
	display: flex;
	color: white;
	align-items: center;
	justify-content: center;
	font-size: 12px;
`;

export default React.memo(Navbar);
