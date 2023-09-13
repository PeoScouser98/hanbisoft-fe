import { Component, ErrorInfo } from 'react';

type State = {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<React.PropsWithChildren, State> {
	public state: State = {
		hasError: false,
		error: null,
		errorInfo: null
	};

	public static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error, errorInfo };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: '16px' }}>
					<h2 style={{ marginBottom: '16px' }}>Something went wrong</h2>
					<details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo?.componentStack}
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
