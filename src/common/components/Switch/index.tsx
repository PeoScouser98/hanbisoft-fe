/**
 * @copyright PeoScouser98
 */

import useDxTheme from '@/common/hooks/useDxTheme';
import styled from '@emotion/styled';
import React from 'react';
import Typography from '../Typography';
import type { TSwitchProps } from '@/types/global';
import { useTheme } from '@emotion/react';

const Switch = React.forwardRef<React.Ref<HTMLInputElement>, TSwitchProps>(
	({ onElement: OnElement, offElement: OffElement, onChange: handleChange }, ref) => {
		const { mode } = useDxTheme();
		const theme = useTheme();
		const localRef = React.useRef(null);
		const resolvedRef = (localRef || ref) as React.MutableRefObject<any>;

		return (
			<Switcher css={{ outline: `1px solid ${theme.colors.accent[mode]}` }}>
				{!!OffElement && !!OnElement ? (
					<React.Fragment>
						<OnElement className='switch-on' />
						<OffElement className='switch-off' />
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography
							className='switch-on'
							variant='small'
							css={{ fontSize: '8px !important', padding: '0 2px !important', fontWeight: 'bold' }}>
							On
						</Typography>
						<Typography
							className='switch-off'
							variant='small'
							css={{ fontSize: '8px !important', padding: '0 2px !important', fontWeight: 'bold' }}>
							Off
						</Typography>
					</React.Fragment>
				)}
				<input type='checkbox' onChange={handleChange} ref={resolvedRef} />
				<Toggler className='toggler' mode={mode} />
			</Switcher>
		);
	}
);

const Switcher = styled.label`
	position: relative;
	display: inline-block;
	width: 36px;
	border-radius: 18px;
	height: 18px;
	z-index: 3;

	& .switch-on,
	& .switch-off {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 16px;
		padding: 0 1px;
		user-select: none;
	}
	& .switch-on {
		right: 2px;
	}
	& .switch-off {
		left: 2px;
	}
	& input[type='checkbox'] {
		display: none;
	}
	& input[type='checkbox']:checked + .toggler::before {
		content: '';
		position: absolute;
		transform: translateX(18px);
		left: 1px;
		top: 1px;
		bottom: 1px;
		width: 16px;
		height: 16px;
	}
	& input[type='checkbox']:checked + .toggler {
		background-color: white;
	}
`;

const Toggler = styled.i<{ mode: string }>`
	cursor: pointer;
	border-radius: 16px;
	z-index: 1 !important;
	transition: background-color 0.2s ease-in-out;
	& ::before {
		position: absolute;
		content: '';
		left: 1px;
		top: 1px;
		bottom: 1px;
		width: 16px;
		height: 16px;
		background-color: ${({ theme, mode }) => {
			return theme.colors.accent[mode];
		}};
		border-radius: 50%;
		transition: cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
	}
`;

export default React.memo(Switch);
