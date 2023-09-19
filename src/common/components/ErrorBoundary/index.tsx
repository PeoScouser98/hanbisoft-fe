import { Component, ErrorInfo } from 'react';
import Typography from '../Typography';
import styled from 'styled-components';

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
				<Wrapper>
					<span className='material-symbols-outlined'>error</span>
					<div>
						<Typography variant='h3' css={{ marginBottom: '8px' }}>
							Something went wrong
						</Typography>
						<details css={{ whiteSpace: 'pre-wrap' }}>
							{this.state.error && this.state.error.toString()}
							<br />
							{this.state.errorInfo?.componentStack}
						</details>
					</div>
				</Wrapper>
			);
		}

		return this.props.children;
	}
}

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 16px;
	padding: 1rem;
	& > :first-child {
		flex-basis: 3rem;
		font-size: 3rem;
		color: ${({ theme: { colors } }) => colors.danger};
	}
`;

export default ErrorBoundary;
