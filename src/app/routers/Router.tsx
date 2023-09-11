import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routersConfig';

export default function Routers() {
	const routers = createBrowserRouter(routesConfig);
	return <RouterProvider router={routers} />;
}
