import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RoutineBox from 'src/components/common/RoutineBox/index';
import DayChange from 'src/components/Day/DayInfoSection/DayChange';
import DayInfo from 'src/components/Day/DayInfoSection/DayInfo';
import MainDayPlan from 'src/components/Day/MainDayPlanList';
import CalendarBtn from 'src/components/Day/Modal/CalendarBtn';
import Reschedule from 'src/components/Day/Reschedule';
import TimeLine from 'src/components/Day/TimeDragSection/TimeLine';
import TodayNoteSection from 'src/components/Day/TodayNote/TodayNoteSection';
import styled from 'styled-components';

function Day() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.Root>
        <Styled.HeaderWrapper>
          <DayInfo />
          <Styled.HeaderOptionWrapper>
            <DayChange />
            <CalendarBtn />
          </Styled.HeaderOptionWrapper>
        </Styled.HeaderWrapper>
        <Styled.MainWrapper>
          <MainDayPlan />
          <TimeLine />
        </Styled.MainWrapper>
        <Styled.BottomWrapper>
          <Reschedule />
          <TodayNoteSection />
        </Styled.BottomWrapper>
      </Styled.Root>
      <Styled.RoutineboxWrapper>
        <RoutineBox />
      </Styled.RoutineboxWrapper>
    </DndProvider>
  );
}

export default Day;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
  `,
  HeaderWrapper: styled.div`
    display: flex;
    padding: 0 4.4rem;
    margin-top: 4rem;
    justify-content: space-between;
  `,
  HeaderOptionWrapper: styled.div`
    display: flex;
    gap: 2.6rem;
    margin-top: 0.4rem;
  `,
  MainWrapper: styled.section`
    display: flex;
    gap: 3.3rem;
    margin-left: 4.2rem;
    margin-top: -4rem;
  `,
  BottomWrapper: styled.div`
    display: flex;
    align-items: flex-start;
    padding: 0 4.4rem;
    gap: 4.7rem;
    margin-bottom: 6.1rem;
  `,
  RoutineboxWrapper: styled.div`
    z-index: 10;
    position: absolute;
    top: 6.4rem;
    right: 0;
  `,
};
