import React from 'react';
import TodayNote from 'src/components/Day/TodayNote/index';
import TodayPlan from 'src/components/Day/TodayPlan/index';

function Day() {
  return (
    <>
      <TodayPlan />
      <TodayNote />
    </>
  );
}

export default Day;

// const Styled = {
//   Root: styled.div``,
// };
