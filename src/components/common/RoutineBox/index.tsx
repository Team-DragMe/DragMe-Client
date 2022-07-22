import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import useGetRoutineSchedules from 'src/hooks/query/useGetRoutineSchedules';
import { routineSchedules } from 'src/mock-data/schedules';
import { routinePlanList } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import DayPlanList from '../DayPlanList/DayPlanList';

const ROUTINE_BOX = {
  EN: 'ROUTINE ROAD',
  KO: '자주 세우는 계획은 루틴로드에 세워보세요.',
};

function RoutineBox() {
  const routinePlanData = useSetRecoilState(routinePlanList);
  const { data } = useGetRoutineSchedules();
  useEffect(() => {
    data && routinePlanData(data);
  }, [data, routinePlanData]);
  return (
    <Styled.Root>
      <Styled.ContentsWrapper>
        <Styled.TitleArea>
          <Styled.Title>{ROUTINE_BOX.EN}</Styled.Title>
          <Styled.SubTitle>{ROUTINE_BOX.KO}</Styled.SubTitle>
        </Styled.TitleArea>
        <Styled.DailyListWrapper>
          <DayPlanList className="routine-plan-list" flag={FLAG.ROUTINE} schedulesData={data} />
        </Styled.DailyListWrapper>
      </Styled.ContentsWrapper>
      <Styled.Footer>
        <button>DRAG.ME</button>
        <button>Find one’s own direction</button>
      </Styled.Footer>
    </Styled.Root>
  );
}

export default RoutineBox;

const Styled = {
  Root: styled.section`
    width: 28rem;
    height: 100%;
    background: ${theme.colors.scroll_grey};
    border: 1px solid ${theme.category.cate_white};
    box-shadow: 0px 0px 10px #d2d9e8;
    border-radius: 7rem 0rem 0rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .routine-plan-list {
      position: relative;
      right: 1rem;
    }
  `,
  ContentsWrapper: styled.article`
    position: absolute;
    top: 40.5%;
    left: 52%;
    transform: translate(-50%, -50%);
  `,
  TitleArea: styled.div`
    padding-bottom: 1.2rem;
    border-bottom: 1px solid #d3d6dc;
    margin-bottom: 1.8rem;
    color: ${theme.colors.letter_black};
  `,
  Title: styled.h2`
    font-style: normal;
    font-weight: 800;
    font-size: 2.4rem;
    line-height: 150%;
  `,
  SubTitle: styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 150%;
    text-transform: uppercase;
  `,
  DailyListWrapper: styled.div`
    padding-left: 0.3rem;
  `,

  Footer: styled.footer`
    position: absolute;
    display: flex;
    justify-content: space-around;
    bottom: 1%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 27rem;
    & button {
      outline: inherit;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: inherit;
      font: inherit;

      font-style: normal;
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 150%;
      text-transform: uppercase;
      color: #d0d4da;
      &:first-child {
        &::after {
          content: '';
          position: absolute;
          width: 0.1rem;
          height: 0.8rem;
          background: #d0d4da;
          left: 28%;
          top: 27%;
          /* margin-right: 1.4rem; */
        }
      }
    }
  `,
};
