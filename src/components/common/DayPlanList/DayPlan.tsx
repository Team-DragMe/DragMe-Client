import React from 'react';
import { useDrag } from 'react-dnd';
import styled, { css } from 'styled-components';

import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';
import SubDayPlan from './SubDayPlanList';

interface DayPlanProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  item: any;
}

interface liStyleProps {
  haveChild: boolean;
  isDragging: boolean;
}

interface subDayPlanStyleProps {
  isOpen: boolean;
}
function DayPlan({ item }: DayPlanProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'draggablePlanChip',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Styled.Li
      key={item._id}
      haveChild={item.subSchedules.length > 0}
      ref={isOpen ? drag : null}
      isDragging={isDragging}
    >
      <CommonDayPlanChip
        color={item.categoryColorCode}
        shape={item.subSchedules.length > 0 ? 'rectangle' : 'triangle'}
        haveChild={item.subSchedules.length > 0}
        addon
        isOpened={isOpen}
        onArrowBtnClick={onArrowBtnClick}
        isCompleted={item.isCompleted}
        ref={isOpen ? null : drag}
      >
        {item.title}
      </CommonDayPlanChip>
      {item.subSchedules.length > 0 && (
        <Styled.SubDayPlanWrapper isOpen={isOpen}>
          <SubDayPlan subschedules={item.subSchedules} categoryColorCode={item.categoryColorCode} />
        </Styled.SubDayPlanWrapper>
      )}
    </Styled.Li>
  );
}

export default DayPlan;

const Styled = {
  Li: styled.li<liStyleProps>`
    margin: 0;
    padding: 0;
    width: 210px;
    height: fit-content;
    list-style-type: none;
    ${({ haveChild }) =>
      !haveChild &&
      css`
        margin-bottom: 1.2rem;
      `}
    ${({ isDragging }) =>
      isDragging
        ? css`
            opacity: 0;
            position: absolute;
            /* transition: max-height 0.2s ease-in; */
            /* opacity: 0;
            position: absolute; */
            /* max-height: 0rem; */
          `
        : css`
            opacity: 0.999;
            /* transition: max-height 0.15s ease-out; */
            /* opacity: 1; */
            /* max-height: fit-content; */
          `}
  `,
  SubDayPlanWrapper: styled.div<subDayPlanStyleProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
    ${({ isOpen }) =>
      isOpen
        ? css`
            transition: max-height 0.2s ease-in;
            max-height: 10rem;
          `
        : css`
            transition: max-height 0.15s ease-out;
            max-height: 1.2rem;
          `}
  `,
};
