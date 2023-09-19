import { useEffect, useState } from 'react';

export default function useDynamicImport() {
	const [loading, setLoading] = useState<boolean>(true);
	const handleImport = async (path: string, fallback?: string) => {
		try {
			await import(path /* @vite-ignore */);
			setLoading(false);
		} catch (error) {
			if (fallback) await import(fallback /* @vite-ignore */);
		}
	};
	return { loading, handleImport };
}
