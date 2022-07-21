import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RoutineBox from 'src/components/common/RoutineBox';
import DayPlanModal from 'src/components/Day/DayPlanModal';
import MainDayPlan from 'src/components/Day/MainDayPlanList';
import Reschedule from 'src/components/Day/Reschedule';
import TodayNoteSection from 'src/components/Day/TodayNote/TodayNoteSection';
import TodayPlan from 'src/components/Day/TodayPlan';
import styled from 'styled-components';

function Day() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.Root>
        <div>
          <MainDayPlan />
          <Reschedule />
        </div>
        <div>
          <RoutineBox />
        </div>
        <TodayNoteSection></TodayNoteSection>
        <DayPlanModal></DayPlanModal>
      </Styled.Root>
    </DndProvider>
  );
}

export default Day;

const Styled = {
  Root: styled.div`
    margin-left: 1rem;
    display: flex;
    padding: 5rem;
    & > section {
      margin-bottom: 6.1rem;
    }
  `,
};
