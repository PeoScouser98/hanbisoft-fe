import useDxTheme from '@/app/hooks/useDxTheme';
import React from 'react';
import styled from 'styled-components';

const ThemeSwitcher = () => {
	const { currentTheme, switchTheme } = useDxTheme();

	return (
		<Switch>
			<i className='dx-icon-sun' />
			<i className='dx-icon-moon' />
			<input
				type='checkbox'
				checked={currentTheme === 'light'}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const theme = e.target.checked ? 'light' : 'dark';
					switchTheme(theme);
				}}
			/>
			<i className='toggler' />
		</Switch>
	);
};

const Switch = styled.label.attrs({
	className: 'dx-theme-background-color dx-theme-text-color dx-theme-border-color'
})`
	position: relative;
	display: inline-block;
	width: 48px;
	min-width: 48px;
	border-radius: 24px;
	height: 24px;
	z-index: 3;
	outline: 1px solid ${({ theme }) => theme.colors.accent};

	& .dx-icon-sun,
	& .dx-icon-moon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: -1;
		font-size: 18px;
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
		transform: translateX(24px);
	}
	& input[type='checkbox']:checked + .toggler {
		background-color: white;
	}
	& .toggler {
		cursor: pointer;
		border-radius: 24px;
		z-index: 99 !important;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transition: background-color 0.2s ease-in-out;
	}
	& .toggler::before {
		position: absolute;
		content: '';
		left: 2px;
		top: 2px;
		bottom: 2px;
		width: 20px;
		height: 20px;
		z-index: 3;
		background-color: ${({ theme }) => theme.colors.accent};
		border-radius: 50%;
		transition: cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
	}
`;

export default React.memo(ThemeSwitcher);
