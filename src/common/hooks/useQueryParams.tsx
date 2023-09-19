import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function useQueryParams() {
	const [urlParams, setUrlParams] = React.useState<{ [key: string]: any }>();
	const params = useParams();
	const appendUrlParams = () => {
		new URLSearchParams({
			...params
		});
	};
	return params;
}
