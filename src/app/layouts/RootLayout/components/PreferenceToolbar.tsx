import useSwitchTheme from '@/app/hooks/useSwitchTheme';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { setLanguage } from '@/app/store/reducers/language.reducer';
import { RootState } from '@/app/store/type';
import Divider from '@/core/components/Divider';
import ThemeSwitcher from '@/core/components/ThemeSwitcher';
import { DropDownButton } from 'devextreme-react';
import Button, { IButtonOptions } from 'devextreme-react/button';
import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from './Breadcrumbs';

type Props = {
	open: boolean;
	onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreferenceToolbar = (props: Props) => {
	const { currentTheme, switchTheme } = useSwitchTheme();

	const languages = useAppSelector((state: RootState) => state.languages);
	const dispatch = useAppDispatch();

	const themeModesConfig = React.useMemo(
		() => [
			{
				id: 1,
				text: 'Light',
				icon: 'sun',
				selected: true,
				value: 'light'
			},
			{
				id: 2,
				text: 'Dark',
				icon: 'moon',
				value: 'dark'
			}
		],
		[]
	);
	React.useEffect(() => {
		const curr = themeModesConfig.find((mode) => mode.value === currentTheme);
		console.log('curr:>>>', curr);
		// return curr;
	}, []);
	return (
		<Toolbar>
			<FlexBox>
				<StyledButton
					icon={props.open ? 'chevrondoubleleft' : 'chevrondoubleright'}
					stylingMode='text'
					type='back'
					focusStateEnabled={false}
					onClick={() => props.onOpenStateChange(!props.open)}
				/>
				<Divider width={2} />
				<Breadcrumbs />
			</FlexBox>

			<FlexBox>
				<StyledDropdownButton
					deferRendering
					text='Languages'
					icon='globe'
					stylingMode='text'
					focusStateEnabled={false}
					items={languages}
					useSelectMode={false}
					selectedItemKey='id'
					selectedItem={languages.find((lang) => lang.used)}
					activeStateEnabled
					onItemClick={(e) => {
						console.log(e.itemData.value);
						dispatch(setLanguage(e.itemData));
					}}
					displayExpr='text'
					keyExpr='id'
				/>
				<ThemeSwitcher switched={currentTheme === 'light'} onSwitch={switchTheme} />
			</FlexBox>
		</Toolbar>
	);
};

const Toolbar = styled.nav.attrs({ className: 'dx-theme-accent-as-background-color' })`
	height: 100%;
	max-height: 3rem;
	padding: 8px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledButton = styled(Button)<React.PropsWithChildren & IButtonOptions>`
	& *::before {
		color: white;
	}
`;

const FlexBox = styled.div<{ divideX?: boolean }>`
	display: flex;
	align-items: center;
	gap: 16px;
	& hr {
		align-self: stretch;
	}
`;

const StyledDropdownButton = styled(DropDownButton)`
	& .dx-button-content,
	& .dx-button-content *::before {
		color: white;
	}
`;

export default PreferenceToolbar;
