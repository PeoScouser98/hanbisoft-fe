import useDXTheme from '@/common/hooks/useDXTheme';
import { Toaster } from 'sonner';

export default function ToastContainer() {
	const { currentTheme } = useDXTheme();

	const toastClassName =
		currentTheme === 'light'
			? 'dx-theme-background-color dx-theme-text-color'
			: 'dx-theme-border-color-as-background-color dx-state-active dx-theme-text-color';

	return (
		<Toaster
			position='bottom-right'
			dir='auto'
			closeButton
			visibleToasts={5}
			toastOptions={{ className: toastClassName, style: { border: 'none', margin: 16 } }}
		/>
	);
}
