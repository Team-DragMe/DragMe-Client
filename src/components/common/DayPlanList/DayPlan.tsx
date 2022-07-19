/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { FLAG, PLAN_CHIP } from 'src/constants';
import { dailyPlanFlag, Schedule } from 'src/types';
import styled, { css } from 'styled-components';

import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';
import SubDayPlan from './SubDayPlanList';

export interface movePlanChipParams extends Schedule {
  hoverFlag: dailyPlanFlag;
  hoverIndex: number;
}

interface DayPlanProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  item: Schedule;
  idx: number;
  flag: dailyPlanFlag;
  movePlanChip: (data: movePlanChipParams) => void;
  endToMovePlanChip: (data: movePlanChipParams) => void;
}

interface liStyleProps {
  haveChild: boolean;
  isDragging: boolean;
  flag: dailyPlanFlag;
  index: number;
  isFake?: boolean;
}

interface subDayPlanStyleProps {
  isOpen: boolean;
}

type FlagType = 'daily' | 'routine' | 'rechedule' | 'weekly' | 'child';

interface dragItemType extends Schedule {
  _id: string;
  flag: FlagType;
  date: string;
  index: number;
}

const DayPlan = React.memo(function DayPlan({
  item,
  idx,
  movePlanChip,
  flag,
  endToMovePlanChip,
}: DayPlanProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  // const originalIndex = findPlanChip(item._id);

  React.useEffect(() => {
    console.log('>>>>isFake', item.isFake);
  }, []);

  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  // daily일 때 그 내부에서 드래그앤 드랍 결정
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: flag,
      item: { index: idx, ...item },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
      //드래그가 끝났을때 작동하는 부분.
      end: (item, monitor: any) => {
        const dragItemObj = item as dragItemType;

        const hoverFlag = flag;
        const hoverIndex = idx;
        endToMovePlanChip({
          hoverFlag,
          hoverIndex,
          ...dragItemObj,
        });
        const didDrop = monitor.didDrop();
        // 드래그 끝났을 때 dropRef 위로 떨어지지 않으면 원래대로 복귀시키는 함수
        if (didDrop) {
          return 0;
        }
      },
    }),
    [item._id, movePlanChip],
  );

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: [FLAG.DAILY, FLAG.RECHEDULE, FLAG.ROUTINE],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      // canDrop: (item) => {
      //   console.log('>>item', item);
      // },
      hover(item) {
        const dragItemObj = item as dragItemType;

        const hoverFlag = flag;
        const hoverIndex = idx;
        movePlanChip({
          hoverFlag,
          hoverIndex,
          ...dragItemObj,
        });

        // if (hoverFlag === 'routine' || hoverFlag === 'rechedule') {
        //   return;
        // }

        // console.log('>>>item', item);
        // console.log('>>>>>>>>>item', item);
        // console.log('>>hover한 아이의 index', idx);
        // console.log('>>hover한 아이의 flag', flag);
        // console.log('hover', item);
        // 기존 요소랑 다른 곳에 드랍이 되면 id를 바탕으로
        // console.log('>>>idx', item.index);
        // console.log('>>>idx>>', item._id);

        // if (item._id) {
        //   // id를 바탕으로 변경할 index를 찾음 (기존 배열 )
        //   const { index: overIndex } = findPlanChip(item._id);
        //   // draggedId가 고유의 키값, 변경할 인덱스 -> draggedId를 가진 애를 overIndex로 옮긴다
        //   movePlanChip(item._id, overIndex);
        // }
      },
    }),
    [movePlanChip],
  );

  return (
    <Styled.Li
      key={item._id}
      haveChild={item.subSchedules.length > 0}
      ref={isOpen ? (item) => dragRef(dropRef(item)) : null}
      flag={item.flag}
      isDragging={isDragging}
      index={idx}
      isFake={item?.isFake}
    >
      <CommonDayPlanChip
        color={item.categoryColorCode}
        shape={item.subSchedules.length > 0 ? 'rectangle' : 'triangle'}
        haveChild={item.subSchedules.length > 0}
        addon
        isOpened={isOpen}
        onArrowBtnClick={onArrowBtnClick}
        isCompleted={item.isCompleted}
        ref={isOpen ? null : (item) => dragRef(dropRef(item))}
        flag={item.flag}
        id={item._id}
        index={idx}
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
    ${({ isFake }) =>
      isFake &&
      css`
        opacity: 0.5;
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
