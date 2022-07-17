import React from 'react';
import { useRecoilValue } from 'recoil';
import { weekInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function WeekInfo() {
  const weekData = useRecoilValue(weekInfo);

  return (
    <Styled.Root>
      <Styled.YearAndMonth>
        <Styled.Month>{weekData.slice(4, 6)}</Styled.Month>
        <Styled.Year>{weekData.slice(0, 4)}</Styled.Year>
      </Styled.YearAndMonth>
      <Styled.WeekPeriod>{`${weekData.slice(6, 8)}-${weekData.slice(15, 17)}`}</Styled.WeekPeriod>
    </Styled.Root>
  );
}

export default WeekInfo;

const Styled = {
  Root: styled.div`
    color: ${theme.colors.letter_black};
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 110px;
    font-size: 5rem;
    font-weight: 900;
    margin-top: 2rem;
    margin-left: 2rem;
    /* 임시 마진 푸쉬시 삭제*/
  `,
  YearAndMonth: styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  `,
  Month: styled.div`
    font-size: 1.8rem;
    width: 4.5rem;
    position: relative;
    padding-left: 0.4rem;
    &:before {
      content: '';
      position: absolute;
      right: 0.8rem;
      bottom: 0.23rem;
      height: 1.3rem;
      width: 4.5rem;
      border-right: 1px solid black;
    }
  `,
  Year: styled.div`
    padding-left: 0.2rem;
  `,
  WeekPeriod: styled.div`
    font-size: 5rem;
  `,
};
