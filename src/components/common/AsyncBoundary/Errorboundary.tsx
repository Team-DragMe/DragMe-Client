import React, { ReactElement } from 'react';
import { Nullable, ReactChild } from 'src/types';

interface IParentComponentProps {
  className?: string;
  children: ReactChild;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Nullable<Error>;
}

export type RejectedFallbackFuncType = ({
  error,
  reset,
}: {
  error: Nullable<Error>;
  reset: () => void;
}) => ReactElement;

interface IProps extends IParentComponentProps {
  renderFallback: RejectedFallbackFuncType;
  resetKey?: string[];
  [x: string]: unknown;
}

class ErrorBoundary extends React.Component<IProps, IErrorBoundaryState> {
  initState: IErrorBoundaryState = { hasError: false, error: null };

  constructor(props: IProps) {
    super(props);
    this.state = this.initState;
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: IProps) {
    const { hasError } = this.state;
    const { resetKey: prevResetKey } = prevProps;
    const { resetKey: currentResetKey } = this.props;
    if (!hasError === null) return;
    if (prevResetKey !== currentResetKey) {
      this.resetErrorBoundary();
    }
  }

  componentDidCatch(error: Error) {
    // Error의 로깅 방식을 추가한다
    console.log(error);
  }

  resetErrorBoundary() {
    this.setState(this.initState);
  }

  render() {
    const { children, renderFallback } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      return renderFallback({
        error,
        /* resetErrorBoundary 메서드에서 this를 사용하지 않으므로 off*/
        // eslint-disable-next-line @typescript-eslint/unbound-method
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

export default ErrorBoundary;
