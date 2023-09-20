import { useParams, useSearchParams } from 'react-router-dom';

function useQueryParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = useParams();
	// Hàm để lấy giá trị của một URL param
	const getParam = (paramName) => {
		return searchParams.get(paramName);
	};

	// Hàm để thiết lập giá trị của một URL param
	const setParam = (paramName, paramValue) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set(paramName, paramValue);
		setSearchParams(newSearchParams);
	};

	// Hàm để xóa một URL param
	const deleteParam = (paramName) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete(paramName);
		setSearchParams(newSearchParams);
	};

	return { params, getParam, setParam, deleteParam };
}

export default useQueryParams;
