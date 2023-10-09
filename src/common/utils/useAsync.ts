import __configs from '@/app/configs/app.config';

const useAsync =
	(fn) =>
	(...args) =>
		Promise.resolve(fn(...args)).catch((error) => {
			if (__configs.ENV === 'development') console.log('[ERROR] >>> ', error.message);
		});

export default useAsync;
