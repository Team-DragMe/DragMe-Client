import React from 'react';
import { schedules } from 'src/mock-data/schedules';
import styled from 'styled-components';

import MainDayPlan from './MainDayPlan';

const RESCHEDULE = {
  EN: 'RESCHEDULE',
  KO: '미룰 계획',
};

function Reschedule() {
  return (
    <Styled.Root>
      <Styled.TitleArea>
        <Styled.Title>{RESCHEDULE.EN}</Styled.Title>
        <Styled.SubTitle>{RESCHEDULE.KO}</Styled.SubTitle>
      </Styled.TitleArea>
      <Styled.UlWrapper>
        <Styled.Ul>
          {schedules.map((item) => (
            <MainDayPlan item={item} key={item._id} />
          ))}
        </Styled.Ul>
      </Styled.UlWrapper>
    </Styled.Root>
  );
}

export default Reschedule;

const Styled = {
  Root: styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 23rem;
  `,
  TitleArea: styled.div`
    display: flex;
    margin-bottom: 1.2rem;
    margin-left: 1rem;
  `,
  Title: styled.h2`
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
  `,
  SubTitle: styled.h2`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    &::before {
      content: '|';
      margin-left: 0.8rem;
      margin-right: 0.8rem;
    }
  `,
  UlWrapper: styled.article`
    max-height: 12rem;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  Ul: styled.ul`
    min-height: 12rem;
    width: 21rem;
  `,
};
