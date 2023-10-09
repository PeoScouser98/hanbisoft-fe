import navigation from '@/app/configs/navigation.config';
import { useAppSelector } from '@/app/store/hook';
import usePageNavigate from '@/common/hooks/usePageNavigate';
import { TNavigation } from '@/types/global';
import styled from '@emotion/styled';
import { ChevronRight } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, matchPath, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FunctionComponent = () => {
	const { t, i18n } = useTranslation('common');
	const { pathname } = useLocation();

	const breadcrumbs: Array<Pick<TNavigation, 'text' | 'path' | 'breadcrumbs'>> = React.useMemo(() => {
		const matchedNavigationItem = navigation.find((item) => {
			return item.path
				? !!matchPath(item?.path as string, pathname)
				: !!item.items?.find((subItem) => matchPath(subItem?.path!, pathname));
		});

		return matchedNavigationItem?.hasItems
			? matchedNavigationItem.items?.find((item) => !!matchPath(item?.path as string, pathname))?.breadcrumbs
			: matchedNavigationItem?.breadcrumbs;
	}, [pathname, i18n.language, t]);

	return (
		<BreadCrumbsWrapper>
			<StyledLink to='/' id='home-breacrumbs'>
				<HomeIcon css={{ fontSize: '18px !important' }} />
			</StyledLink>

			{Array.isArray(breadcrumbs) &&
				breadcrumbs.map((item: Pick<TNavigation, 'id' | 'locale' | 'path'>, index) => (
					<React.Fragment key={index}>
						<ChevronRight css={{ fontSize: '20px' }} />
						<StyledLink to={item?.path}>{t(item?.locale)}</StyledLink>
					</React.Fragment>
				))}
		</BreadCrumbsWrapper>
	);
};

const BreadCrumbsWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	vertical-align: middle !important;
	gap: 0.5em;
	& * + *,
	& * {
		color: white;
	}
	@media screen and (${({ theme }) => theme.breakpoints.mobile}) {
		display: none;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 12px !important;
	line-height: 14px;
	vertical-align: middle !important;
	white-space: nowrap;
	font-weight: medium;
	color: white !important;
`;

export default React.memo(Breadcrumbs);
