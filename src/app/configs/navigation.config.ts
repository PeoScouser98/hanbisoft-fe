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
	// 	i18nKey: 'common:navigation.scheduler',
	// 	path: '/scheduler',
	// 	icon: 'file',
	// 	hasItems: false,
	// 	breadcrumbs: [{ i18nKey: 'scheduler', path: '/scheduler' }]
	// }

	// {
	// 	id: '3',
	// 	i18nKey: 'common:navigation.data_grid',
	// 	icon: 'folder',
	// 	hasItems: true
	// },
	// {
	// 	id: '3.1',
	// 	parentId: '3',
	// 	i18nKey: 'common:navigation.simple_data_grid',
	// 	path: '/data-grid/simple-example',
	// 	icon: 'file',
	// 	breadcrumbs: [
	// 		{ i18nKey: 'common:navigation.simple_data_grid', path: '/data-grid/simple-example' },
	// 		{ i18nKey: 'common:navigation.simple_data_grid', path: '/data-grid/simple-example' }
	// 	]
	// },
	// {
	// 	id: '3.2',
	// 	parentId: '3',
	// 	i18nKey: 'common:navigation.header_group',
	// 	path: '/data-grid/header-grouping',
	// 	icon: 'file',
	// 	breadcrumbs: [
	// 		{ i18nKey: 'common:navigation.header_group', path: '/data-grid/header-grouping' },
	// 		{ i18nKey: 'common:navigation.header_group', path: '/data-grid/header-grouping' }
	// 	]
	// }
];

export default navigation;
