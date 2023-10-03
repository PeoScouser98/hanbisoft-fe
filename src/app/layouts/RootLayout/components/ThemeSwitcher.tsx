import useDarkMode from '@/common/hooks/useDarkMode';
import styled from '@emotion/styled';
import React from 'react';

const ThemeSwitcher: React.FunctionComponent = () => {
	const { currentTheme, changeTheme } = useDarkMode();
	return (
		<Switch className='dx-theme-background-color dx-theme-text-color dx-theme-border-color'>
			<i className='dx-icon-sun' />
			<i className='dx-icon-moon' />
			<input
				type='checkbox'
				checked={currentTheme.mode === 'light'}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const theme = e.target.checked ? 'generic.light' : 'generic.dark';
					changeTheme(theme);
				}}
			/>
			<Toggler className='toggler' mode={currentTheme.mode} />
		</Switch>
	);
};

const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: 40px;
	border-radius: 20px;
	height: 20px;
	z-index: 3;

	& .dx-icon-sun,
	& .dx-icon-moon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 16px;
	}
	& .dx-icon-moon {
		right: 4px;
	}
	& .dx-icon-sun {
		left: 4px;
	}
	& input[type='checkbox'] {
		display: none;
	}
	& input[type='checkbox']:checked + .toggler::before {
		transform: translateX(20px);
	}
	& input[type='checkbox']:checked + .toggler {
		background-color: white;
	}
`;

const Toggler = styled.i<{ mode: string }>`
	cursor: pointer;
	border-radius: 20px;
	z-index: 1 !important;
	transition: background-color 0.2s ease-in-out;
	& ::before {
		position: absolute;
		content: '';
		left: 2px;
		top: 2px;
		bottom: 2px;
		width: 17px;
		height: 17px;
		z-index: 3;
		background-color: ${({ theme, mode }) => {
			return theme.colors.accent[mode];
		}};
		border-radius: 50%;
		transition: cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
	}
`;

export default React.memo(ThemeSwitcher);
