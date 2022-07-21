import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dayInfo } from 'src/states';

import ForwardEmojiPicker from './EmojiPicker';
import TodayPlanInput from './TodayPlanInput';

interface TodayPlanProps {
  emoji: string;
  dailyGoal: string;
}
function TodayPlan({ emoji, dailyGoal }: TodayPlanProps) {
  const [click, setClick] = useState<boolean>(false);
  const useOutsideAlert = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (event.target instanceof HTMLElement) {
          if (ref.current && !ref.current.contains(event.target)) {
            setClick(false);
          }
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  const handleClick = (value: boolean) => {
    setClick(value);
  };
  const refPicker = useRef<HTMLDivElement>(null);
  useOutsideAlert(refPicker);

  const today = useRecoilValue(dayInfo);
  const todayDate = today.slice(0, 10);
  return (
    <StyledTodayPlan.Root>
      <ForwardEmojiPicker
        ref={refPicker}
        click={click}
        setClick={handleClick}
        emoji={emoji}
        date={todayDate}
      />
      <TodayPlanInput dailyGoal={dailyGoal} />
    </StyledTodayPlan.Root>
  );
}

export default TodayPlan;

const StyledTodayPlan = {
  Root: styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
  `,
};
