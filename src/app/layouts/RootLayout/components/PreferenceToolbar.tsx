import TranslateIcon from '@/assets/translate.svg?raw';
import ThemeSwitcher from '@/app/layouts/RootLayout/components/ThemeSwitcher';
import { useLocalStorage } from '@/common/hooks/useStorage';
import { locales } from '@/i18n';
import { DropDownButton } from 'devextreme-react';
import Button, { IButtonOptions } from 'devextreme-react/button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Breadcrumbs from './Breadcrumbs';

type Props = {
	open: boolean;
	onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreferenceToolbar = (props: Props) => {
	const { i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useLocalStorage(
		'language',
		locales[(i18n.language as keyof typeof locales) || 'en']
	);

	return (
		<Toolbar className='dx-theme-accent-as-background-color'>
			<FlexBox horizontalDivide>
				<div>
					<StyledButton
						id='toggle-panel-btn'
						icon={props.open ? 'chevrondoubleleft' : 'chevrondoubleright'}
						stylingMode='text'
						type='normal'
						focusStateEnabled={false}
						onClick={() => {
							props.onOpenStateChange(!props.open);
						}}
					/>
				</div>
				<Breadcrumbs />
			</FlexBox>
			<FlexBox style={{ justifyContent: 'flex-end' }}>
				<ThemeSwitcher />

				<DropDownButton
					icon={TranslateIcon}
					width='100%'
					height={32}
					dataSource={Object.values(locales)}
					stylingMode='contained'
					useSelectMode
					selectedItemKey={currentLanguage?.value}
					focusStateEnabled={false}
					text={currentLanguage?.text}
					selectedItem={currentLanguage}
					displayExpr='text'
					onSelectionChanged={(e) => {
						i18n.changeLanguage(e.item?.value);
						setCurrentLanguage(e?.item);
					}}
					keyExpr='value'
				/>
			</FlexBox>
		</Toolbar>
	);
};

const Toolbar = styled.nav`
	height: 100%;
	max-height: 3rem;
	padding: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media screen and (min-width: 375px) and (max-width: 767px) {
		padding: 4px;
	}
`;

const StyledButton = styled(Button)<React.PropsWithChildren & IButtonOptions>`
	& *::before {
		color: white;
	}
`;

const horizontalDivide = css`
	& > * + * {
		border-width: 0 0 0 2px;
		border-style: solid;
		border-color: white;
		padding: 0 16px;
	}
	& > :nth-child(odd) {
		padding-right: 12px;
	}
	& > :nth-child(even) {
		padding-left: 12px;
	}
`;

const FlexBox = styled.div<{ horizontalDivide?: boolean }>`
	display: flex;
	align-items: center;
	gap: ${(props) => (props.horizontalDivide ? 0 : '16px')};
	${(props) => (props.horizontalDivide ? horizontalDivide : undefined)}
`;

export default React.memo(PreferenceToolbar);
