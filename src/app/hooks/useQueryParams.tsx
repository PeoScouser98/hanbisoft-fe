import { useLocation, useParams } from 'react-router-dom';

export default function useQueryParams() {
	const params = useParams();
	const location = useLocation();
	return params;
}
