import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilValue } from 'recoil';
import RoutineBox from 'src/components/common/RoutineBox/index';
import MonthlyGoalBox from 'src/components/Week/MonthlyGoal/MonthlyGoalBox';
import WeekChange from 'src/components/Week/WeekChange';
import WeekInfo from 'src/components/Week/WeekInfo';
import WeeklyGoalBox from 'src/components/Week/WeeklyGoal/WeeklyGoalBox';
import WeekPlan from 'src/components/Week/WeekPlan/WeekPlan';
import { RoutineBoxIsOpened } from 'src/states';
import styled from 'styled-components';

function Week() {
  const ModalToggle = useRecoilValue(RoutineBoxIsOpened);

  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.Root>
        <Styled.HeaderWrapper>
          <WeekInfo />
          <WeekChange />
        </Styled.HeaderWrapper>
        <Styled.MainWrapper>
          <WeekPlan />
          <Styled.MainLeftWrapper>
            <MonthlyGoalBox />
            <WeeklyGoalBox />
          </Styled.MainLeftWrapper>
        </Styled.MainWrapper>
        <Styled.RoutineboxWrapper isModal={ModalToggle}>
          <RoutineBox />
        </Styled.RoutineboxWrapper>
      </Styled.Root>
    </DndProvider>
  );
}

export default Week;

const Styled = {
  Root: styled.div`
    width: 144rem;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,
  HeaderWrapper: styled.div`
    display: flex;
    padding: 0 4.4rem;
    margin-top: 4.9rem;
    justify-content: space-between;
  `,

  MainWrapper: styled.section`
    display: flex;
    gap: 3.3rem;
    margin-left: 4.2rem;
    margin-top: -11rem;
    margin-bottom: 5.5rem;
  `,
  MainLeftWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 0.7rem;
  `,
  RoutineboxWrapper: styled.div<{ isModal: boolean }>`
    z-index: 10;
    position: absolute;
    height: 83.7rem;
    top: 0.7rem;
    right: -28rem;
    transition: all 1s;
    transform: ${({ isModal }) => isModal && 'translateX(-107%)'};
  `,
};
