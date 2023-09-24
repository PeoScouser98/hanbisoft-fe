import React from 'react';
import FallbackImage from '@/assets/images/no-image.png';
import { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/css';
import Skeleton from '../Skeleton';
import styled from '@emotion/styled';

const Image = (
	props: React.ClassAttributes<HTMLImageElement> &
		React.ImgHTMLAttributes<HTMLImageElement> & {
			css?: Interpolation<Theme>;
		} & { fallback?: string; skeletonProps?: typeof Skeleton.prototype.props }
) => {
	const [loading, setLoading] = React.useState<boolean>(true);

	return (
		<Picture>
			<Skeleton css={props.css} style={{ display: loading ? 'block' : 'none' }} />
			<img
				{...props}
				src={props.src}
				alt={props.alt || 'image'}
				onLoad={(e) => {
					setLoading(false);
					e.currentTarget.src = props.src;
				}}
				style={{ display: loading ? 'none' : 'inline-block' }}
				css={props.css}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = props.fallback || FallbackImage;
				}}
			/>
		</Picture>
	);
};

const Picture = styled.div`
	position: relative;
	width: auto;
	height: auto;
`;

export default Image;
