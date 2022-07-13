import React from 'react';
import { useRecoilValue } from 'recoil';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import { dayInfo } from '../../../states';

function DayInfo() {
  const dayData = useRecoilValue(dayInfo);
  return (
    <Styled.Root>
      <Styled.HeaderBox>
        <Styled.Month>{dayData.slice(4, 6)}</Styled.Month>
        <Styled.DayOfTheWeek>{dayData.slice(8, 11)}</Styled.DayOfTheWeek>
      </Styled.HeaderBox>
      <Styled.Day>{dayData.slice(6, 8)}.</Styled.Day>
    </Styled.Root>
  );
}

export default DayInfo;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.letter_black};
    width: 12.9rem;
    height: 12.6rem;
    display: flex;
    font-weight: 900;
    flex-direction: column;
  `,
  HeaderBox: styled.div`
    display: flex;
    justify-content: center;
    height: 2.8rem;
    align-items: center;
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
