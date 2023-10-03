import { useAppSelector } from '@/app/store/hook';
import { Toaster } from 'sonner';

const ToastContainer: React.FunctionComponent = () => {
	const currentTheme = useAppSelector((state) => state.theme);

	const className =
		currentTheme.mode === 'light'
			? 'dx-theme-background-color dx-theme-text-color'
			: 'dx-theme-border-color-as-background-color dx-state-active dx-theme-text-color';

	return (
		<Toaster
			position='top-center'
			dir='auto'
			closeButton
			visibleToasts={5}
			toastOptions={{ className, style: { border: 'none', margin: 16 } }}
		/>
	);
};

export default ToastContainer;
