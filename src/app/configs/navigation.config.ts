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
		hasItems: true,
		breadcrumbs: [{ i18nKey: 'common:navigation.users', path: '/users' }]
	},
	{
		id: '2.1',
		parentId: '2',
		i18nKey: 'common:navigation.list_all_users',
		path: '/users',
		icon: 'group',
		breadcrumbs: [{ i18nKey: 'users', path: '/users' }]
	},
	{
		id: '2.2',
		parentId: '2',
		i18nKey: 'common:navigation.create_new_user',
		path: '/users/create',
		icon: 'plus',
		breadcrumbs: [
			{ i18nKey: 'common:navigation.users', path: '/users' },
			{ i18nKey: 'common:navigation.create', path: '/users/create' }
		]
	}
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
	// {
	// 	id: '4',
	// 	i18nKey: 'common:navigation.scheduler',
	// 	path: '/scheduler',
	// 	icon: 'file',
	// 	hasItems: false,
	// 	breadcrumbs: [{ i18nKey: 'scheduler', path: '/scheduler' }]
	// }
];

export default navigation;
