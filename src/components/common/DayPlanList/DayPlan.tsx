/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { FLAG, PLAN_CHIP } from 'src/constants';
import useLatestState from 'src/hooks/useLatestState';
import { dailyPlanFlag, Schedule } from 'src/types';
import styled, { css } from 'styled-components';

import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';
import { moveItemInSectionParams } from './DayPlanList';
import SubDayPlan from './SubDayPlanList';

export type positionType = 'top' | 'bottom';
export interface movePlanChipParams extends Schedule {
  hoverFlag: dailyPlanFlag;
  hoverIndex: number;
  liType?: 'haveChild' | 'notChild';
}

interface DayPlanProps {
  // @TODO 실제 데이터 타입에 맞춰서 타이핑 수정
  item: Schedule;
  idx: number;
  flag: dailyPlanFlag;
  movePlanChip: (data: movePlanChipParams) => void;
  endToMovePlanChip: (data: movePlanChipParams) => void;
  isFake?: boolean;
  dataLength?: number;
  isDragMode?: boolean;
  thorottleMoveItemInSection: (data: moveItemInSectionParams) => void;
  [key: string]: any;
}

interface liStyleProps {
  haveChild: boolean;
  isDragging: boolean;
  flag: dailyPlanFlag;
  index: number;
  isFake?: boolean;
  currentDraggingEl?: dailyPlanFlag | null;
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
  isFake = false,
  dataLength = 0,
  isDragMode = false,
  thorottleMoveItemInSection,
  ...props
}: DayPlanProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDraggingEl, setCurrentDraggingEl, latestDraggingEl] =
    useLatestState<FlagType | null>(null);
  // const [draggingItem, setDraggingItem] = useState<Schedule | null>();
  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  // 1. 드래깅 객체 flag가 daily가 아니면 순서 영역 감지 안되도록
  // 2. flag 랑 hoverflag가 둘다 daily이면 아예 absolute로 갈기기

  // daily일 때 그 내부에서 드래그앤 드랍 결정
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: flag,
      item: { index: idx, isOpen, ...item },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
      // isDragging: (item) => {
      //   console.log('>>emformwnd');
      //   return true;
      // },
      //드래그가 끝났을때 작동하는 부분.
      end: (item, monitor: any) => {
        const dragItemObj = item as dragItemType;
        console.log('드래그 끗');
        const hoverFlag = flag;
        const hoverIndex = idx;
        endToMovePlanChip({
          hoverFlag,
          hoverIndex,
          ...dragItemObj,
        });
        const didDrop = monitor.didDrop();
        // 드래그 끝났을 때 dropRef 위로 떨어지지 않으면 원래대로 복귀시키는 함수
        if (!didDrop) {
          return 0;
        }
      },
    }),
    [item._id, movePlanChip],
  );

  const [{ isOver, canDrop, isActive }, dropRef] = useDrop(
    () => ({
      accept: [FLAG.DAILY, FLAG.RECHEDULE, FLAG.ROUTINE],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isActive: monitor.canDrop() && monitor.isOver(),
      }),

      hover(item) {
        const dragItemObj = item as dragItemType;
        setCurrentDraggingEl(dragItemObj.flag);

        const hoverFlag = flag;
        const hoverIndex = idx;
        movePlanChip({
          hoverFlag,
          hoverIndex,
          ...dragItemObj,
        });
      },
    }),
    [movePlanChip],
  );
  const handleDragEnter = (type: positionType, index: number, hoverId: string) => {
    // console.log('>>draggingItem 이거야', draggingItem);
    if (item.flag !== 'daily') {
      return;
    }
    console.log('type은 이거야', type);
    console.log('index는 이거야', index);
    console.log('hoverId는 이거야', hoverId);
    thorottleMoveItemInSection({
      type,
      index,
      hoverId,
      ...(item as Schedule),
    });
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setCurrentDraggingEl(e.currentTarget.id as FlagType);
    console.log('---------------------------------');
    console.log(e.currentTarget.id);
  };

  useEffect(() => {
    console.log('>>>>currentDraggingEl', currentDraggingEl);
  }, [currentDraggingEl]);

  useEffect(() => {
    console.log('>>>>latestDraggingEl.current', latestDraggingEl.current);
  }, [latestDraggingEl.current]);

  return (
    <Styled.Li
      key={item._id}
      haveChild={item.subSchedules?.length > 0}
      ref={isOpen ? (item) => dragRef(dropRef(item)) : null}
      id={flag}
      isDragging={isDragging}
      currentDraggingEl={currentDraggingEl}
      index={idx}
      isFake={isFake}
      liType="haveChild"
      // onMouseDown={handleMouseDown}
    >
      <CommonDayPlanChip
        color={item.categoryColorCode}
        shape={item.subSchedules?.length > 0 ? 'rectangle' : 'triangle'}
        haveChild={item.subSchedules?.length > 0}
        addon
        isOpened={isOpen}
        onArrowBtnClick={onArrowBtnClick}
        isCompleted={item.isCompleted}
        ref={(item) => dragRef(dropRef(item))}
        itemId={item._id}
        index={idx}
        id={flag}
        liType="notChild"
        // onMouseDown={handleMouseDown}
      >
        {item.title}
      </CommonDayPlanChip>

      {item.subSchedules?.length > 0 && (
        <Styled.SubDayPlanWrapper isOpen={isOpen}>
          <SubDayPlan subschedules={item.subSchedules} categoryColorCode={item.categoryColorCode} />
        </Styled.SubDayPlanWrapper>
      )}

      {currentDraggingEl === 'daily' && flag === 'daily' && !isDragging && isDragMode && (
        <div>
          <Styled.EventHandleTopDom
            key={item._id}
            index={idx * 3.8}
            id={item._id}
            onDragEnter={() => {
              handleDragEnter('top', idx, item._id);
            }}
          />
          <Styled.EventHandleBottomDom
            key={item._id}
            index={idx * 3.8}
            id={item._id}
            onDragEnter={() => {
              handleDragEnter('bottom', idx, item._id);
            }}
          />
        </div>
      )}
    </Styled.Li>
  );
});

export default DayPlan;

const Styled = {
  Li: styled.li<liStyleProps>`
    margin: 0;
    padding: 0;
    width: 21rem;
    height: fit-content;
    list-style-type: none;
    position: relative;

    ${({ haveChild }) =>
      !haveChild &&
      css`
        padding-bottom: 1.2rem;
      `}
    ${({ isDragging }) =>
      isDragging
        ? css`
            opacity: 0.3;
          `
        : css`
            opacity: 0.999;
          `}
      ${({ isDragging, flag, currentDraggingEl }) =>
      isDragging &&
      flag === 'daily' &&
      currentDraggingEl === 'daily' &&
      css`
        opacity: 0;
        position: absolute;
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
            z-index: 1;
          `
        : css`
            transition: max-height 0.15s ease-out;
            max-height: 1.2rem;
            z-index: -1;
          `}
  `,
  EventHandleBottomDom: styled.div<{ index: number }>`
    width: 21rem;
    height: calc(100% - 1.6rem);
    position: absolute;
    z-index: 5;
    /* background: red; */
    opacity: 0.3;
    top: 1.6rem;
    /* bottom: 50%; */
    /* top: ${({ index }) => `${index}rem`}; */
  `,
  EventHandleTopDom: styled.div<{ index: number }>`
    width: 21rem;
    height: 1.6rem;
    position: absolute;
    z-index: 5;
    /*  */
    opacity: 0.3;
    top: 0;
    /* bottom: 50%; */
    /* top: ${({ index }) => `${index}rem`}; */
  `,
};
