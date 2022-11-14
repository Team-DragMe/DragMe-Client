import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { theme } from 'src/styles/theme';
import { DayStorage, getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

function DayChange() {
  const [count, setCount] = useState(0);
  const DEFAULT_DATE_CHANGE = 0;
  const PREV_DATE = -1;
  const NEXT_DATE = 1;
  const router = useRouter();
  const today = getTodayDate(DEFAULT_DATE_CHANGE);

  useEffect(() => {
    const localCount = Number(window.localStorage.getItem('date'));
    if (localCount) {
      setCount(localCount);
    }
    router.push(`/day/${DayStorage(today.slice(0, 10), localCount)}`);
  }, []);

  useEffect(() => {
    moveToSelectedDate();
    window.localStorage.setItem('date', count.toString());
  }, [count]);

  const moveToSelectedDate = () => {
    router.push(`/day/${DayStorage(today.slice(0, 10), count)}`);
  };

  const getPrevDate = () => {
    setCount(count + PREV_DATE);
  };

  const getFollowDate = () => {
    setCount(count + NEXT_DATE);
  };

  const goToday = () => {
    setCount(DEFAULT_DATE_CHANGE);
  };

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
