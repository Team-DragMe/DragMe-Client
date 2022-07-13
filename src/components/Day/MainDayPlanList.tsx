import React from 'react';
import { schedules } from 'src/mock-data/schedules';

import DayPlanList from '../common/DayPlanList/DayPlanList';

function MainDayPlanList() {
  return <DayPlanList schedules={schedules} />;
}

export default MainDayPlanList;
