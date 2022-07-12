import React from 'react';
import styled from 'styled-components';

import CommonDayPlanChip from '../common/CommonDayPlanChip';

interface MainDayPlanProps {
  color?: string;
  data?: string[];
}
function MainDayPlan(props: MainDayPlanProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Styled.Li>
      <CommonDayPlanChip
        color="black"
        shape="triangle"
        haveChild
        isOpened={isOpen}
        onArrowBtnClick={onArrowBtnClick}
      >
        오늘 할 일
      </CommonDayPlanChip>
    </Styled.Li>
  );
}

export default MainDayPlan;

const Styled = {
  Li: styled.li`
    margin: 0;
    padding: 0;
    width: 210px;
    height: fit-content;
    list-style-type: none;
  `,
};
