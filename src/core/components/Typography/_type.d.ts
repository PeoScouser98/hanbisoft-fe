import React from 'react';

export declare interface ITypographyProps extends React.AllHTMLAttributes<HTMLElement>, React.PropsWithChildren {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
	color?: 'accent' | 'danger' | 'success' | 'warning';
}
