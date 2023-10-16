/**
 * @copyright PeoScouser98
 */

import FallbackImage from '@/assets/images/no-image.png';
import styled from '@emotion/styled';
import React from 'react';
import Skeleton from '../Skeleton';
import { TImageProps } from '@/types/global';

const Image: React.FC<TImageProps> = (props) => {
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
				loading='lazy'
				style={{ display: loading ? 'none' : 'inline-block' }}
				css={props.css}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = props.fallbackImage || FallbackImage;
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
