import { INavigation } from '@/types/entities';
/**
 * @example
 * const navigation = {
 *		id: '1',
 *		locale: 'common:navigation.dashboard',
 *		path: '/',
 *		icon: 'home',
 *		hasItems: false,
 *		breadcrumbs: [{ locale: 'common:navigation.dashboard', path: '/' }]
 *	}
 */

const navigation: Array<INavigation> = [
	{
		id: '1',
		locale: 'common:navigation.dashboard',
		path: '/',
		icon: 'home',
		hasItems: false,
		canReorder: false,
		breadcrumbs: [{ locale: 'common:navigation.dashboard', path: '/' }]
	},
	{
		id: '2',
		locale: 'common:navigation.users',
		icon: 'group',
		path: '/users',
		hasItems: false,
		canReorder: true,
		breadcrumbs: [{ locale: 'common:navigation.users', path: '/users' }]
	},
	{
		id: '3',
		locale: 'common:navigation.settings',
		path: '/settings',
		icon: 'preferences',
		breadcrumbs: [{ locale: 'common:navigation.settings', path: '/settings' }],
		visible: false,
		canReorder: true
	},
	{
		id: '4',
		locale: 'common:navigation.equipments',
		path: '/equipments',
		icon: 'file',
		canReorder: true,
		breadcrumbs: [{ locale: 'common:navigation.equipments', path: '/equipments' }]
	}
];

export default navigation;
