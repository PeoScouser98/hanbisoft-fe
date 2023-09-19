import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import NotFoundPage from '@/app/pages/Error/NotFoundPage';
import Signin from '@/app/pages/Auth/Signin';
import RestrictedPermissionLayout from '../layouts/RestrictedLayouts/RestrictedPermissionLayout';
import PermissionDeniedPage from '../pages/Error/PermissionDeniedPage';

const SchedulerExample = React.lazy(() => import('../pages/Examples/Scheduler'));
const SimpleDataGridExample = React.lazy(() => import('@/app/pages/Examples/DataGrid/SimpleDataGrid'));
const HeaderGroupDataGridExample = React.lazy(() => import('@/app/pages/Examples/DataGrid/HeaderGrouping'));
const UserLayout = React.lazy(() => import('@/app/pages/User'));
const DataGridExampleLayout = React.lazy(() => import('@/app/pages/Examples/DataGrid'));
const RegisterPage = React.lazy(() => import('@/app/pages/User/RegisterPage'));
const UserListPage = React.lazy(() => import('@/app/pages/User/UserList'));

const routesConfig: Array<RouteObject> = [
	{ path: '*', element: <NotFoundPage /> },
	{ path: '/403', element: <PermissionDeniedPage /> },
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: '/users',

				element: (
					<RestrictedPermissionLayout>
						<UserLayout />
					</RestrictedPermissionLayout>
				),
				children: [
					{ index: true, element: <UserListPage /> },
					{ path: 'create', element: <RegisterPage /> }
				]
			},
			{
				path: '/data-grid',
				element: <DataGridExampleLayout />,
				children: [
					{
						path: 'simple-example',
						element: <SimpleDataGridExample />
					},
					{
						path: 'header-grouping',
						element: <HeaderGroupDataGridExample />
					}
				]
			},
			{
				path: '/scheduler',
				element: <SchedulerExample />
			}
		]
	},
	{
		path: '/signin',
		element: <Signin />
	}
];

export default routesConfig;
