import React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
import { errorsToStrings } from 'src/shared/lib/errorsToStrings';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: new Error(errorsToStrings(error).join(",\n")) };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handlerRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
        console.log("try render error boundary")
      return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <span>{this.state.error.message}</span>
            <button onClick={this.handlerRetry}>
              Здесь могла быть ваша реклама
            </button>
          
        </div>
      );
    }

    return this.props.children;
  }
}