import React from 'react';

export default function useScreenSize() {
	const [screenSize, setScreenSize] = React.useState(getCurrentDimension());

	function getCurrentDimension() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}

	React.useEffect(() => {
		const updateDimension = () => {
			setScreenSize(getCurrentDimension());
		};
		window.addEventListener('resize', updateDimension);

		return () => {
			window.removeEventListener('resize', updateDimension);
		};
	}, [screenSize]);

	return screenSize;
}
