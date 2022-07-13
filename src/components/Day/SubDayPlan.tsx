import React from 'react';
import styled from 'styled-components';

import CommonDayPlanChip from '../common/CommonDayPlanChip';

interface SubDayPlanProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  subschedules: any;
  categoryColorCode: string;
  isCompleted: boolean;
}

interface liStyleProps {
  // @TODO 컬러코드값 타입으로 수정하기
  categoryColorCode: string;
}

function SubDayPlan({ subschedules, categoryColorCode, isCompleted, ...props }: SubDayPlanProps) {
  return (
    <Styled.SubUl>
      {subschedules.map((item) => (
        <Styled.SubLi key={item._id} categoryColorCode={categoryColorCode}>
          {/* @TODO 하위 아이템 데이터 오면 넘길 인자 정하기 */}
          <CommonDayPlanChip isCompleted={isCompleted}>서브 메뉴</CommonDayPlanChip>
        </Styled.SubLi>
      ))}
    </Styled.SubUl>
  );
}

export default SubDayPlan;

const Styled = {
  SubUl: styled.ul`
    width: 17.9rem;
    /* animation: SubUlAnimation 1s forwards; */
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
