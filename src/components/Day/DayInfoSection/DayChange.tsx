import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { theme } from 'src/styles/theme';
import { DateInfomationType } from 'src/types/day';
import { DayStorage, getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

interface DateSelectType extends DateInfomationType {
  setDateCount: (date: number) => void;
}

function DayChange({ changedDateCounter, setDateCount }: DateSelectType) {
  const DEFAULT_DATE_CHANGE = 0;
  const PREV_DATE = -1;
  const NEXT_DATE = 1;
  const router = useRouter();
  const today = getTodayDate(DEFAULT_DATE_CHANGE);
  const dayPlanURL = router.query.date?.toString();

  const goToSelectedDay = () => {
    if (dayPlanURL !== undefined) {
      changedDateCounter
        ? router.push(`/day/${DayStorage(today.slice(0, 10), changedDateCounter.current)}`)
        : router.push(`/day/${today}`);
    }
  };

  const getPrevDate = () => {
    setDateCount(PREV_DATE);
    goToSelectedDay();
  };

  const getFollowDate = () => {
    setDateCount(NEXT_DATE);
    goToSelectedDay();
  };

  const goToday = () => {
    setDateCount(DEFAULT_DATE_CHANGE);
    goToSelectedDay();
  };

  useEffect(() => {
    if (getTodayDate(0) !== undefined) {
      router.push(`/day/${DayStorage(today.slice(0, 10), changedDateCounter.current)}`);
    }
  }, []);

  return (
    <Styled.Root>
      <Styled.NavigatorButton onClick={getPrevDate}>&lt;</Styled.NavigatorButton>
      <Styled.MoveTodayButton onClick={goToday}>TODAY</Styled.MoveTodayButton>
      <Styled.NavigatorButton onClick={getFollowDate}>&gt;</Styled.NavigatorButton>
    </Styled.Root>
  );
}

export default DayChange;

const Styled = {
  Root: styled.div`
    height: 1.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${theme.colors.letter_black};
  `,
  MoveTodayButton: styled.div`
    margin-top: 0.4rem;
    padding: 1.5rem;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.main_color};
    }
  `,
  NavigatorButton: styled.div`
    padding: 1.5rem 0.5rem;
    font-size: 1.5rem;
    font-weight: 300;
    color: ${theme.colors.plan_grey};
    cursor: pointer;
    &:hover {
      color: ${theme.colors.main_color};
      font-weight: bold;
    }
  `,
};
