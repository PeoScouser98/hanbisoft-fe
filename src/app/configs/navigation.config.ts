import { TNavigation } from '@/types/global';

/**
 * @example const navigation ={
		id: '1',
		i18nKey: 'common:navigation.dashboard',
		path: '/',
		icon: 'home',
		hasItems: false,
		breadcrumbs: [{ i18nKey: 'common:navigation.dashboard', path: '/' }]
	}
 */
const navigation: Array<TNavigation> = [
	{
		id: '1',
		i18nKey: 'common:navigation.dashboard',
		path: '/',
		icon: 'home',
		hasItems: false,
		breadcrumbs: [{ i18nKey: 'common:navigation.dashboard', path: '/' }]
	},
	{
		id: '2',
		i18nKey: 'common:navigation.users',
		icon: 'group',
		path: '/users',
		hasItems: false,
		breadcrumbs: [{ i18nKey: 'common:navigation.users', path: '/users' }]
	},
	{
		id: '3',
		i18nKey: 'common:navigation.equipments',
		path: '/equipments',
		icon: 'file',
		breadcrumbs: [{ i18nKey: 'common:navigation.equipments', path: '/equipments' }]
	}
];

export default navigation;
