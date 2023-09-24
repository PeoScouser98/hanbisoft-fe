import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import React from 'react';
// overflow-hidden relative my-2 h-3 w-full rounded-sm bg-gray-100 before:absolute before:h-full before:w-1/2 before:animate-slide before:bg-gradient-to-r before:from-transparent before:via-[#e5e7eb90] before:to-transparent before:[content:'*']

export default function Skeleton(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return <StyledSkeleton {...props} />;
}

const shimmer = keyframes`
   0%{
transform: translateX(0%)
   }
   100%{
      transform: translateX(120%)
   }
`;

const StyledSkeleton = styled.div`
	overflow: hidden;
	position: relative;
	margin: 8px 0;
	border-radius: 4px;
	&::before {
		content: '';
		height: 100%;
		width: 50%;
		animation: ${shimmer} 0.3s infinite;
		background-image: linear-gradient();
	}
`;
