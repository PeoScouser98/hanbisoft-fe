import navigation from '@/app/configs/navigation.config';
import TranslateIcon from '@/assets/svg/translate.svg?raw';
import Switch from '@/common/components/Switch';
import useDxTheme from '@/common/hooks/useDxTheme';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import { useLocalStorage } from '@/common/hooks/useStorage';
import { locales } from '@/i18n';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DropDownButton } from 'devextreme-react';
import Button, { IButtonOptions } from 'devextreme-react/button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from './Breadcrumbs';

type Props = {
	open: boolean;
	onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const settingPageMetadata = navigation.find((nav) => nav.path === '/settings');

const PreferenceToolbar: React.FC<Props> = (props) => {
	const { i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useLocalStorage(
		'language',
		locales[(i18n.language as keyof typeof locales) || 'en']
	);
	const { handleOpenPage } = usePageNavigate();

	return (
		<Toolbar className='dx-theme-accent-as-background-color'>
			<FlexBox divide>
				<FlexBox>
					<StyledButton
						id='toggle-panel-btn'
						icon='menu'
						stylingMode='text'
						type='normal'
						focusStateEnabled={false}
						onClick={() => {
							props.onOpenStateChange(!props.open);
						}}
					/>
				</FlexBox>
				<Breadcrumbs />
			</FlexBox>
			<FlexBox style={{ justifyContent: 'flex-end' }}>
				<DropDownButton
					icon={TranslateIcon}
					dataSource={Object.values(locales)}
					stylingMode='contained'
					useSelectMode
					height={24}
					selectedItemKey={currentLanguage?.value}
					focusStateEnabled={false}
					selectedItem={currentLanguage}
					displayExpr='text'
					onSelectionChanged={(e) => {
						i18n.changeLanguage(e.item?.value);
						setCurrentLanguage(e?.item);
					}}
					keyExpr='value'
				/>
				<Button
					focusStateEnabled={false}
					icon='preferences'
					stylingMode='contained'
					text='Settings'
					onClick={() =>
						handleOpenPage({
							id: settingPageMetadata?.id,
							path: settingPageMetadata?.path,
							locale: settingPageMetadata?.locale,
							canReorder: true,
							canClose: true
						})
					}
				/>
			</FlexBox>
		</Toolbar>
	);
};

const Toolbar = styled.nav`
	height: 100%;
	height: 2rem;
	padding: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		padding: 4px;
	}
`;

const StyledButton = styled(Button)<React.PropsWithChildren & IButtonOptions>`
	& *::before {
		color: white;
	}
`;

const divide = css`
	& > * + * {
		border-width: 0 0 0 2px;
		border-style: solid;
		border-color: rgba(225, 225, 225, 0.9);
		padding: 0 16px;
	}
	& > :nth-of-type(odd) {
		padding-right: 12px;
	}
	& > :nth-of-type(even) {
		padding-left: 12px;
	}
`;

const FlexBox = styled.div<{ divide?: boolean }>`
	display: flex;
	align-items: center;
	gap: ${(props) => (props.divide ? 0 : '8px')};
	${(props) => (props.divide ? divide : undefined)}
`;

export default React.memo(PreferenceToolbar);
