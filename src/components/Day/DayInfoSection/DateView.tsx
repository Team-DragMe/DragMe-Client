import React from 'react';
import { theme } from 'src/styles/theme';
import { DayStorage, makeDateString } from 'src/utils/getDate';
import styled from 'styled-components';

function DateView() {
  const CHANGED_DAYS_NUMBER = Number(window.sessionStorage.getItem('changedDaysCount')) || 0;
  const STANDARD_DATE = makeDateString(0);
  const CHANGED_DATE =
    STANDARD_DATE !== null
      ? DayStorage(STANDARD_DATE.slice(0, 10), CHANGED_DAYS_NUMBER)
      : makeDateString(CHANGED_DAYS_NUMBER);
  const MONTH = CHANGED_DATE.slice(5, 7);
  const DATE = CHANGED_DATE.slice(8, 10);
  const DAY_OF_THE_WEEK = CHANGED_DATE.slice(11, 14);

  return (
    <Styled.Root>
      <Styled.HeaderBox>
        <Styled.Month>{MONTH}</Styled.Month>
        <Styled.DayOfTheWeek>{DAY_OF_THE_WEEK}</Styled.DayOfTheWeek>
      </Styled.HeaderBox>
      <Styled.Day>{DATE}.</Styled.Day>
    </Styled.Root>
  );
}

export default DateView;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    color: ${theme.colors.letter_black};
    width: 12.9rem;
    font-weight: 900;
  `,
  HeaderBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.8rem;
  `,
  Month: styled.div`
    font-size: 1.8rem;
    width: 4.5rem;
    position: relative;
    padding-left: 0.1rem;
    margin-left: 0.6rem;
    &:before {
      content: '';
      position: absolute;
      right: 0.2rem;
      bottom: 0.23rem;
      height: 1.3rem;
      width: 4.5rem;
      border-right: 1.5px solid black;
    }
  `,
  Day: styled.div`
    align-items: flex-start;
    font-size: 8.4rem;
    margin-top: -0.75rem;
  `,
  DayOfTheWeek: styled.div`
    font-size: 1.8rem;
    width: 8.4rem;
    padding-left: 1rem;
  `,
};
