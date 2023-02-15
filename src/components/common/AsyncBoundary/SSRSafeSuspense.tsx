import { ComponentProps, Suspense } from 'react';
import useMounted from 'src/hooks/useMounted';

function SSRSafeSuspense(props: ComponentProps<typeof Suspense>) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  const { fallback } = props;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{fallback}</>;
}

export default SSRSafeSuspense;
