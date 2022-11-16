import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { theme } from 'src/styles/theme';
import { DayStorage, getTodayDate } from 'src/utils/getDate';
import styled from 'styled-components';

function DateController() {
  const DEFAULT_DATE_CHANGE = 0;
  const PREV_DATE = -1;
  const NEXT_DATE = 1;
  const [changedDays, setChangedDays] = useState(0);
  const [pivotDate, setPivotDate] = useState(getTodayDate(DEFAULT_DATE_CHANGE));
  const router = useRouter();
  const today = getTodayDate(DEFAULT_DATE_CHANGE);

  useEffect(() => {
    const localCountingDays = Number(window.localStorage.getItem('changedDaysCount'));
    const localPivotDate = window.localStorage.getItem('pivotDate');

    if (!localPivotDate) {
      window.localStorage.setItem('pivotDate', today);
    }
    if (localPivotDate && pivotDate !== localPivotDate) {
      setPivotDate(localPivotDate);
    }
    if (localCountingDays) {
      setChangedDays(localCountingDays);
    }

    router.push(`/day/${DayStorage(pivotDate.slice(0, 10), localCountingDays)}`);
  }, []);

  useEffect(() => {
    moveToSelectedDate();
    window.localStorage.setItem('changedDaysCount', changedDays.toString());
  }, [changedDays]);

  const moveToSelectedDate = () => {
    router.push(`/day/${DayStorage(pivotDate.slice(0, 10), changedDays)}`);
  };

  const getPrevDate = () => {
    setChangedDays((prev) => prev + PREV_DATE);
  };

  const getFollowDate = () => {
    setChangedDays((prev) => prev + NEXT_DATE);
  };

  const getTodaysDate = () => {
    window.localStorage.setItem('pivotDate', today);
    setChangedDays(DEFAULT_DATE_CHANGE);
  };

  return (
    <Styled.Root>
      <Styled.NavigatorButton onClick={getPrevDate}>&lt;</Styled.NavigatorButton>
      <Styled.MoveTodayButton onClick={getTodaysDate}>TODAY</Styled.MoveTodayButton>
      <Styled.NavigatorButton onClick={getFollowDate}>&gt;</Styled.NavigatorButton>
    </Styled.Root>
  );
}

export default DateController;

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
