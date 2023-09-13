import useDxTheme from '@/app/hooks/useDxTheme';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { setLanguage } from '@/app/store/reducers/language.reducer';
import { RootState } from '@/app/store/type';
import ThemeSwitcher from '@/core/components/ThemeSwitcher';
import { DropDownButton } from 'devextreme-react';
import Button, { IButtonOptions } from 'devextreme-react/button';
import React from 'react';
import styled, { css } from 'styled-components';
import Breadcrumbs from './Breadcrumbs';

type Props = {
	open: boolean;
	onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreferenceToolbar = (props: Props) => {
	const languages = useAppSelector((state: RootState) => state.languages);
	const dispatch = useAppDispatch();
	const currentLanguage = languages.find((lang) => lang.used);

	return (
		<Toolbar>
			<FlexBox horizontalDivide>
				<StyledButton
					icon={props.open ? 'chevrondoubleleft' : 'chevrondoubleright'}
					stylingMode='text'
					type='back'
					focusStateEnabled={false}
					onClick={() => props.onOpenStateChange(!props.open)}
				/>

				<Breadcrumbs />
			</FlexBox>
			<FlexBox style={{ justifyContent: 'flex-end' }}>
				<ThemeSwitcher />

				<DropDownButton
					icon={TranslateIcon}
					width='100%'
					dataSource={languages}
					stylingMode='contained'
					useSelectMode
					selectedItemKey={currentLanguage?.value}
					focusStateEnabled={false}
					text={currentLanguage?.text}
					displayExpr='text'
					onSelectionChanged={(e) => {
						dispatch(setLanguage(e.item.value));
					}}
					keyExpr='value'
				/>
			</FlexBox>
		</Toolbar>
	);
};

const Toolbar = styled.nav.attrs({ className: 'dx-theme-accent-as-background-color' })`
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
	}
`;

const FlexBox = styled.div<{ horizontalDivide?: boolean }>`
	display: flex;
	align-items: center;
	gap: 16px;
	${(props) => (props.horizontalDivide ? horizontalDivide : undefined)}
`;

const TranslateIcon = /* html */ `
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="m476-80 182-480h84L924-80h-84l-42-122H604L560-80h-84Zm152-192h144l-70-198h-4l-70 198Zm-468 72-56-56 202-202q-38-42-66.5-87T190-640h84q18 36 38.5 65t49.5 61q44-48 73-98.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 71-57 138t-89 126l96 98-30 82-124-124-200 200Z"/></svg>
	`;

export default PreferenceToolbar;
