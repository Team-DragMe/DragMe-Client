import React from 'react';
import styled from 'styled-components';

function WeekInfo() {
  return (
    <Styled.Root>
      <Styled.YearAndMonth>
        <Styled.Month>07</Styled.Month>
        <Styled.Year>2022</Styled.Year>
      </Styled.YearAndMonth>
      <Styled.WeekPeriod>03-09</Styled.WeekPeriod>
    </Styled.Root>
  );
}

export default WeekInfo;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    width: 160px;
    height: 110px;
    font-size: 5rem;
    font-weight: 900;
    margin-top: 100px;
    margin-left: 100px;
  `,
  YearAndMonth: styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.8rem;
  `,
  Month: styled.div`
    margin-right: 0.9rem;
    font-size: 1.8rem;
    width: 4.5rem;
    position: relative;
    margin-left: 0.9rem;
    &:before {
      content: '';
      position: absolute;
      right: 0.2rem;
      bottom: 0.48rem;
      height: 1.3rem;
      width: 4.5rem;
      border-right: 1.5px solid black;
    }
  `,
  Year: styled.div`
    margin-left: 1rem;
  `,
  WeekPeriod: styled.div``,
};
