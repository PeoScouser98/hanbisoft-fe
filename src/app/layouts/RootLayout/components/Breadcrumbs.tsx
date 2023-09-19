import navigation from '@/app/configs/navigation.config';
import Icon from '@/common/components/DxIcon';
import { INavigation } from '@/type';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Breadcrumbs = () => {
	const { t, i18n } = useTranslation('common');

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
	}, [pathname, i18n.language]);

	return (
		<BreadCrumbsWrapper>
			<StyledLink to='/'>
				<HomeIcon />
			</StyledLink>

			{Array.isArray(breadcrumbs) &&
				breadcrumbs.map((item: Pick<INavigation, 'id' | 'i18nKey' | 'path'>, index) => (
					<React.Fragment key={index}>
						<Icon type='chevronright' key={index} />
						<StyledLink to={item?.path}>{t(item?.i18nKey)}</StyledLink>
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
	white-space: nowrap;
	color: white !important;
	transition: linear 300ms ease-in-out;
`;

export default Breadcrumbs;
