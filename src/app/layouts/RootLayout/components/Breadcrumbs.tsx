import navigation from '@/app/configs/navigation.config';
import Icon from '@/common/components/DxIcon';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { ChevronRight } from '@mui/icons-material';

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
				<HomeIcon css={{ fontSize: '20px !important' }} />
			</StyledLink>

			{Array.isArray(breadcrumbs) &&
				breadcrumbs.map((item: Pick<INavigation, 'id' | 'i18nKey' | 'path'>, index) => (
					<React.Fragment key={index}>
						<ChevronRight />
						<StyledLink to={item?.path}>{t(item?.i18nKey)}</StyledLink>
					</React.Fragment>
				))}
		</BreadCrumbsWrapper>
	);
};

const BreadCrumbsWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 0.5em;

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
	font-size: 14px !important;
	line-height: 16px;
	vertical-align: middle !important;
	white-space: nowrap;
	color: white !important;
	transition: linear 300ms ease-in-out;
`;

export default Breadcrumbs;
