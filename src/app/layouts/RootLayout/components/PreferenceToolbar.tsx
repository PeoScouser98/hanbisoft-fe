import React from 'react';
import TranslateIcon from '@/assets/svg/translate.svg?raw';
import ThemeSwitcher from '@/app/layouts/RootLayout/components/ThemeSwitcher';
import { useLocalStorage } from '@/common/hooks/useStorage';
import { locales } from '@/i18n';
import { DropDownButton } from 'devextreme-react';
import Button, { IButtonOptions } from 'devextreme-react/button';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Breadcrumbs from './Breadcrumbs';
import { Link } from 'react-router-dom';

type Props = {
	open: boolean;
	onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreferenceToolbar: React.FunctionComponent<Props> = (props) => {
	const { i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useLocalStorage(
		'language',
		locales[(i18n.language as keyof typeof locales) || 'en']
	);

	return (
		<Toolbar className='dx-theme-accent-as-background-color'>
			<FlexBox divide>
				<FlexBox>
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
				</FlexBox>

				<Breadcrumbs />
			</FlexBox>
			<FlexBox style={{ justifyContent: 'flex-end' }}>
				<ThemeSwitcher />
				<DropDownButton
					icon={TranslateIcon}
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
	max-height: 2rem;
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

const divide = css`
	& > * + * {
		border-width: 0 0 0 2px;
		border-style: solid;
		border-color: white;
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
	gap: ${(props) => (props.divide ? 0 : '16px')};
	${(props) => (props.divide ? divide : undefined)}
`;

export default React.memo(PreferenceToolbar);
