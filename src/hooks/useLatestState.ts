import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';

function useLatestState<T>(initData: T): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] {
  const [state, setState] = useState<T>(initData);
  const latestState = useRef(state);
  latestState.current = state;

  return [state, setState, latestState];
}

export default useLatestState;
