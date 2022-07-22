import React from 'react';
import { useDrag } from 'react-dnd';
import { PLAN_CHIP } from 'src/constants';
import { Schedule } from 'src/types';
import styled from 'styled-components';

import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';

interface SubDayPlanListProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  subschedules: Schedule[];
  categoryColorCode: string;
}

interface liStyleProps {
  // @TODO 컬러코드값 타입으로 수정하기
  categoryColorCode: string;
}

function SubDayPlanList({ subschedules, categoryColorCode, ...props }: SubDayPlanListProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: PLAN_CHIP.CHILD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Styled.SubUl>
      {subschedules?.map((item: Schedule) => (
        <Styled.SubLi key={item?._id} categoryColorCode={categoryColorCode}>
          {/* @TODO 하위 아이템 데이터 오면 넘길 인자 정하기 */}
          <CommonDayPlanChip
            itemId={item._id}
            ref={dragRef}
            item={item}
            flag={item.flag}
            isCompleted={item?.isCompleted}
          >
            {item.title}
          </CommonDayPlanChip>
        </Styled.SubLi>
      ))}
    </Styled.SubUl>
  );
}

export default SubDayPlanList;

const Styled = {
  SubUl: styled.ul`
    width: 17.9rem;
    li {
      &:first-child {
        margin-top: 1.2rem;
      }
      &:last-child {
        padding-bottom: 0rem;
        margin-bottom: 1.2rem;
      }
    }
  `,
  SubLi: styled.li<liStyleProps>`
    padding-bottom: 1.2rem;
    padding-left: 1rem;
    border-left: 1px solid ${({ categoryColorCode }) => categoryColorCode};
  `,
};
