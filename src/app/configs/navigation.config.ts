import type { INavigation } from '@/core/types/navigation';

const navigation: Array<INavigation> = [
	{
		id: '1',
		text: 'Dashboard',
		path: '/',
		icon: 'home',
		hasItems: false,
		breadcrumbs: [{ text: 'Dashboard', path: '/' }]
	},
	{
		id: '2',
		text: 'Users',
		path: '/users',
		icon: 'group',
		hasItems: false,
		breadcrumbs: [{ text: 'Users', path: '/users' }]
	},
	{
		id: '3',
		text: 'Data grid',
		icon: 'folder',
		hasItems: true,
		items: [
			{
				id: '3.1',
				text: 'Simple data grid',
				path: '/data-grid/simple-example',
				icon: 'file',
				breadcrumbs: [
					{ text: 'Data grid', path: '/data-grid/simple-example' },
					{ text: 'Simple example', path: '/data-grid/simple-example' }
				]
			},
			{
				id: '3.2',
				text: 'Header group',
				path: '/data-grid/header-grouping',
				icon: 'file',
				breadcrumbs: [
					{ text: 'Data grid', path: '/data-grid/header-grouping' },
					{ text: 'Header group', path: '/data-grid/header-grouping' }
				]
			}
		]
	},
	{
		id: '4',
		text: 'Scheduler',
		path: '/scheduler',
		icon: 'file',
		hasItems: false,
		breadcrumbs: [{ text: 'Scheduler', path: '/scheduler' }]
	}
];

export default navigation;
