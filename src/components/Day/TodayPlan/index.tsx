import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ForwardEmojiPicker from './EmojiPicker';
import TodayPlanInput from './TodayPlanInput';

function TodayPlan() {
  const [click, setClick] = useState<boolean>(false);
  const useOutsideAlert = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClick(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  const refPicker = useRef<HTMLDivElement>(null);
  useOutsideAlert(refPicker);

  return (
    <StyledTodayPlan.Root>
      <ForwardEmojiPicker ref={refPicker} click={click} setClick={setClick} />
      <TodayPlanInput />
    </StyledTodayPlan.Root>
  );
}

export default TodayPlan;

const StyledTodayPlan = {
  Root: styled.div`
    display: flex;
    gap: 1.3rem;
  `,
};
