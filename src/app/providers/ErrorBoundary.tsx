import React, { Component, ErrorInfo, ReactNode } from 'react';
import { isServerError } from 'src/shared/lib/errorsCast';
import { errorsToStrings} from 'src/shared/lib/errorsToStrings';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError:boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (isServerError(error)) {
      return { hasError: true, error: new Error(errorsToStrings(error).join(',\n')) };
    } else if (isMessage(error)) {
      return { hasError: true, error: new Error(error.message) };
    }

    return { hasError: true, error: new Error('Unknown error.') };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handlerRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      console.log('try render error boundary');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span>Здесь могла быть ваша реклама</span>
          <span>{this.state.error.message}</span>
          <button onClick={this.handlerRetry}>Перепытаться</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const isMessage = (error: unknown): error is { message: string } => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if ('message' in error && typeof (error as { message: unknown }).message === 'string') {
    return true;
  }

  return false;
};