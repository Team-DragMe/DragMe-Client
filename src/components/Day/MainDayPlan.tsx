import React from 'react';
import { theme } from 'src/styles/theme';
import styled, { css } from 'styled-components';

import AddDayPlanChip from '../common/AddDayPlanChip';
import CommonDayPlanChip from '../common/CommonDayPlanChip';
import SubDayPlan from './SubDayPlan';

interface MainDayPlanProps {
  color?: string;
  data?: string[];
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  schedules?: any;
}

interface liStyleProps {
  isOpen: boolean;
}
function MainDayPlan({ schedules, ...props }: MainDayPlanProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Styled.Root>
      <Styled.Ul>
        {schedules.map((item) => (
          <Styled.Li key={item._id} isOpen={isOpen}>
            <CommonDayPlanChip
              color={item.isCompleted ? '#B6BEC9' : item.categoryColorCode}
              shape={item.subSchedules.length > 0 ? 'rectangle' : 'triangle'}
              haveChild={item.subSchedules.length > 0}
              addon
              isOpened={isOpen}
              onArrowBtnClick={onArrowBtnClick}
              isCompleted={item.isCompleted}
            >
              {item.title}
            </CommonDayPlanChip>
            {item.subSchedules.length > 0 && (
              <Styled.SubDayPlanWrapper isOpen={isOpen}>
                <SubDayPlan
                  subschedules={item.subSchedules}
                  categoryColorCode={item.isCompleted ? '#B6BEC9' : item.categoryColorCode}
                  isCompleted={item.isCompleted}
                />
              </Styled.SubDayPlanWrapper>
            )}
          </Styled.Li>
        ))}
      </Styled.Ul>
      <Styled.AddDayPlanChipWrapper>
        <AddDayPlanChip />
      </Styled.AddDayPlanChipWrapper>
    </Styled.Root>
  );
}

export default MainDayPlan;

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Ul: styled.ul`
    min-height: 44.9rem;
    width: 21.5rem;
    border-bottom: 1px solid ${theme.colors.plan_grey01};
  `,
  Li: styled.li<liStyleProps>`
    margin: 0;
    padding: 0;
    width: 210px;
    height: fit-content;
    list-style-type: none;
  `,
  SubDayPlanWrapper: styled.div<liStyleProps>`
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
  AddDayPlanChipWrapper: styled.div`
    margin-top: 0.8rem;
    width: 21rem;
  `,
};
