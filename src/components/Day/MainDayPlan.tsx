import React from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

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
  console.log(schedules);
  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  // 아이가 있으면 무조건 -> addon, arrow 알아서 잘 됐으면 좋겠음
  // 아이가 없으면 그냥 기본만 알아서 나왔으면 좋겠음

  // 부모가 IsCompleted이면 자식도 IsCompleted
  // 자식이 IsCompleTed
  return (
    <Styled.Root>
      <Styled.Ul>
        {schedules.map((item) => (
          <Styled.Li key={item._id} isOpen={isOpen}>
            <CommonDayPlanChip
              color={item.categoryColorCode}
              shape={item.subSchedules.length > 0 ? 'rectangle' : 'triangle'}
              haveChild={item.subSchedules.length > 0}
              addon
              isOpened={isOpen}
              onArrowBtnClick={onArrowBtnClick}
              isCompleted={item.isCompleted}
            >
              {item.title}
            </CommonDayPlanChip>
            {item.subSchedules.length > 0 && isOpen && (
              <Styled.SubDayPlanWrapper>
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
    margin-bottom: ${({ isOpen }) => !isOpen && '1.2rem'};
  `,
  SubDayPlanWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @keyframes SubUlAnimation {
      from {
        max-height: 1.2rem;
      }
      to {
        max-height: fit-content;
      }
    }
    & ul {
      animation: SubUlAnimation 1s forwards;
      overflow: hidden;
      /* background: black; */
    }
  `,
  AddDayPlanChipWrapper: styled.div`
    margin-top: 0.8rem;
    width: 21rem;
  `,
};
