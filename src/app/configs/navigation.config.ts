import { UserRoleEnum } from '@/common/constants/_app.const';
import { TNavigation } from '@/types/global';

/**
 * @example 
   const navigation ={
		id: '1',
		locale: 'common:navigation.dashboard',
		path: '/',
		icon: 'home',
		hasItems: false,
		breadcrumbs: [{ locale: 'common:navigation.dashboard', path: '/' }]
	}
*/

const navigation: Array<TNavigation> = [
	{
		id: '1',
		locale: 'common:navigation.dashboard',
		path: '/',
		icon: 'home',
		hasItems: false,
		breadcrumbs: [{ locale: 'common:navigation.dashboard', path: '/' }]
	},
	{
		id: '2',
		locale: 'common:navigation.users',
		icon: 'group',
		path: '/users',
		hasItems: false,
		checkAdmin: true,
		breadcrumbs: [{ locale: 'common:navigation.users', path: '/users' }]
	},
	{
		id: '3',
		locale: 'common:navigation.equipments',
		path: '/equipments',
		icon: 'file',
		breadcrumbs: [{ locale: 'common:navigation.equipments', path: '/equipments' }]
	}
];

export default navigation;
