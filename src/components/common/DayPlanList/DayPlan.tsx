/* eslint-disable @typescript-eslint/no-explicit-any */
import { INTERNALS } from 'next/dist/server/web/spec-extension/request';
import React, { useEffect } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { FLAG, PLAN_CHIP } from 'src/constants';
import { dailyPlanFlag } from 'src/types';
import styled, { css } from 'styled-components';

import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';
import SubDayPlan from './SubDayPlanList';

interface DayPlanProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  item: any;
  idx: number;
  findPlanChip: (_id: string) => { planChip: any; index: number };
  movePlanChip: (_id: string, atIndex: number) => void;
  flag: dailyPlanFlag;
}

interface liStyleProps {
  haveChild: boolean;
  isDragging: boolean;
  flag: dailyPlanFlag;
}

interface subDayPlanStyleProps {
  isOpen: boolean;
}

type FlagType = 'daily' | 'routine' | 'rechedule' | 'weekly' | 'child';

interface dragItemType {
  id: string;
  flag: FlagType;
  date: string;
  index: number;
}

const DayPlan = React.memo(function DayPlan({
  item,
  idx,
  findPlanChip,
  movePlanChip,
  flag,
}: DayPlanProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  // const originalIndex = findPlanChip(item._id);

  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  // daily일 때 그 내부에서 드래그앤 드랍 결정
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: flag,
      // item 안에 넣어줄 정보들 세팅 itemId, flag, date, parentId,
      item: { _id: item._id, flag, date: item.date, index: idx },
      // isDragging 정보가 현재 드래깅 중인지 아닌지를 리턴
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
      //드래그가 끝났을때 작동하는 부분.
      end: (item, monitor: any) => {
        // item에서 정보를 리턴해서
        const { _id, flag, date, index } = item;
        console.log(_id, flag, date, index);
        const didDrop = monitor.didDrop();
        // 드래그 끝났을 때 dropRef 위로 떨어지지 않으면 원래대로 복귀시키는 함수
        if (!didDrop && _id && index) {
          // 아이템 아이디와 flag와 바꿀 위치를 받으면 순서를 바꿔주는 함수
          movePlanChip(_id, index);
          // moveNemo는 변경할 네모의 id와 변경될 index를 주면 순서를 바꾸어주는 함수다.
          // 네모들의 state가 상위 컴포넌트인 page에 선언되어있기 때문에 page에 선언되어 있다.
        }
      },
    }),
    [item._id, movePlanChip],
  );

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: FLAG.DAILY,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      // canDrop: (item) => {
      //   console.log('>>item', item);
      // },
      hover(node) {
        // console.log('hover', node);
        // 기존 요소랑 다른 곳에 드랍이 되면 id를 바탕으로
        // console.log('>>>idx', item.index);
        // console.log('>>>idx>>', item._id);

        if (item._id) {
          // id를 바탕으로 변경할 index를 찾음 (기존 배열 )
          const { index: overIndex } = findPlanChip(item._id);
          // draggedId가 고유의 키값, 변경할 인덱스 -> draggedId를 가진 애를 overIndex로 옮긴다
          movePlanChip(item._id, overIndex);
        }
      },
    }),
    [findPlanChip, movePlanChip],
  );

  return (
    <Styled.Li
      key={item._id}
      haveChild={item.subSchedules.length > 0}
      ref={isOpen ? (node) => dragRef(dropRef(node)) : null}
      flag={item.flag}
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
        ref={isOpen ? null : (node) => dragRef(dropRef(node))}
        flag={item.flag}
        id={item._id}
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
});

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
            opacity: 0.3;
          `
        : css`
            opacity: 0.999;
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
