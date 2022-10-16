import { ComponentProps, Suspense } from 'react';
import useMounted from 'src/hooks/useMounted';

function SSRSafeSuspense(props: ComponentProps<typeof Suspense>) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  const { fallback } = props;

  return { fallback };
}

export default SSRSafeSuspense;
