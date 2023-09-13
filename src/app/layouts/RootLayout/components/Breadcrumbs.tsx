import navigation from '@/app/configs/navigation.config';
import DxIcon from '@/core/components/DxIcon';
import Typography from '@/core/components/Typography';
import { INavigation } from '@/core/types/navigation';
import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Breadcrumbs = () => {
	const { pathname } = useLocation();
	const breadcrumbs: Array<Pick<INavigation, 'text' | 'path' | 'breadcrumbs'>> = React.useMemo(() => {
		const matchedNavigationItem = navigation.find((item) => {
			return item.path
				? !!matchPath(item?.path as string, pathname)
				: !!item.items?.find((subItem) => matchPath(subItem?.path!, pathname));
		});

		return matchedNavigationItem?.hasItems
			? matchedNavigationItem.items?.find((item) => !!matchPath(item?.path as string, pathname))?.breadcrumbs
			: matchedNavigationItem?.breadcrumbs;
	}, [pathname]);

	return (
		<BreadCrumbsWrapper>
			<StyledLink to='/'>
				<DxIcon type='home' style={{ fontSize: 18 }} />
			</StyledLink>

			{breadcrumbs.map((item: Pick<INavigation, 'id' | 'text' | 'path'>, index) => (
				<React.Fragment>
					<DxIcon type='chevronright' key={index} />
					<Typography variant='small' style={{ userSelect: 'none', whiteSpace: 'nowrap' }}>
						{item.text}
					</Typography>
				</React.Fragment>
			))}
		</BreadCrumbsWrapper>
	);
};

const BreadCrumbsWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.75em;
	padding: 0 16px;

	& * + *,
	& * {
		color: white;
	}
	@media screen and (max-width: 767px) {
		display: none;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5em;
	transition: linear 300ms ease-in-out;
	& :where(:not(:first)) {
		text-decoration: underline;
	}
`;

export default Breadcrumbs;
