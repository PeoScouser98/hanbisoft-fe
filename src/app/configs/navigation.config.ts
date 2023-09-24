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
const navigation: Array<INavigation> = [
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
		hasItems: true,
		breadcrumbs: [{ i18nKey: 'common:navigation.users', path: '/users' }]
	},
	{
		id: '3',
		i18nKey: 'common:navigation.equipments',
		path: '/equipments',
		icon: 'file',
		breadcrumbs: [{ i18nKey: 'common:navigation.equipments', path: '/equipments' }]
	}
	// {
	// 	id: '4',
	// 	i18nKey: 'common:navigation.equipments',
	// 	path: '/equipments',
	// 	icon: 'folder',
	// 	breadcrumbs: [{ i18nKey: 'common:navigation.equipments', path: '/equipments' }]
	// },
	// {
	// 	id: '4.1',
	// 	parentId: '4',
	// 	i18nKey: 'common:navigation.equipments',
	// 	path: '/',
	// 	icon: 'file'
	// }
];

export default navigation;
