/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ReactDOM from 'react-dom';
import { useRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import useGetSubSchedules from 'src/hooks/query/useGetSubSchedules';
import useLatestState from 'src/hooks/useLatestState';
import { currentDraggintElement, currentHoverFlag } from 'src/states';
import { dailyPlanFlag, Schedule } from 'src/types';
import styled, { css } from 'styled-components';

import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';
import { moveItemInSectionParams } from './DayPlanList';
import SubDayPlan from './SubDayPlanList';

export type positionType = 'top' | 'bottom';
export interface movePlanChipParams extends Schedule {
  hoverFlag?: dailyPlanFlag;
  hoverIndex?: number;
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
  flag?: dailyPlanFlag;
  index: number;
  isFake?: boolean;
  currentDraggingEl?: dailyPlanFlag | null;
}

interface subDayPlanStyleProps {
  isOpen: boolean;
  haveChild?: boolean;
}

type FlagType = 'daily' | 'routine' | 'reschedule' | 'weekly' | 'child';

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
  isDragMode = false,
  thorottleMoveItemInSection,
  ...props
}: DayPlanProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDraggingEl, setCurrentDraggingEl, latestDraggingEl] =
    useLatestState<FlagType | null>(null);
  const [currentDraggingItem, setCurrentDraggingItem] = useRecoilState(currentDraggintElement);
  const [currentHoverItem, setCurrentHoverItem] = useRecoilState(currentHoverFlag);
  const { data: subSchedules } = useGetSubSchedules({
    scheduleId: item?._id,
    isAbled: item?.subSchedules?.length > 0,
    flag,
  });
  const onArrowBtnClick = () => {
    setIsOpen((prev) => !prev);
  };
  const subscheduleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('>>subSchedules', subSchedules);
  }, [subSchedules]);
  // control drag element
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: flag,
      item: { index: idx, isOpen, ...item },
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
        if (!didDrop) {
          return 0;
        }
      },
    }),
    [item?._id, movePlanChip],
  );

  const [{ isOver, canDrop, isActive }, dropRef] = useDrop(
    () => ({
      accept: [FLAG.DAILY, FLAG.reschedule, FLAG.ROUTINE],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isActive: monitor.canDrop() && monitor.isOver(),
      }),

      hover(item) {
        const dragItemObj = item as dragItemType;
        setCurrentDraggingEl(dragItemObj.flag);
        // console.log('?>>>>>>>>dragItemObj', dragItemObj);
        // console.log('?>>>>>>>>flag', flag);
        const hoverFlag = flag;
        const hoverIndex = idx;
        movePlanChip({
          hoverFlag,
          hoverIndex,
          ...dragItemObj,
        });
        setCurrentDraggingItem({
          hoverIndex,
          ...dragItemObj,
        });
      },
    }),
    [movePlanChip],
  );
  const handleDragEnter = (type: positionType, index: number, hoverId: string) => {
    if (item?.flag !== 'daily') {
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
  useEffect(() => {
    setCurrentHoverItem(flag);
  }, [flag, setCurrentHoverItem]);

  useEffect(() => {
    setCurrentHoverItem(null);
  }, [isOver, setCurrentHoverItem]);

  return (
    <Styled.Li
      key={item?._id}
      haveChild={item?.subSchedules?.length > 0}
      ref={isOpen ? (item) => dragRef(dropRef(item)) : null}
      flag={flag}
      isDragging={isDragging}
      currentDraggingEl={currentDraggingEl}
      index={idx}
      isFake={isFake}
    >
      <CommonDayPlanChip
        color={item?.categoryColorCode}
        shape={item?.subSchedules?.length > 0 ? 'rectangle' : 'triangle'}
        haveChild={item?.subSchedules?.length > 0}
        addon
        isOpened={isOpen}
        onArrowBtnClick={onArrowBtnClick}
        isCompleted={item?.isCompleted}
        ref={(item) => dragRef(dropRef(item))}
        itemId={item?._id}
        item={item}
        index={idx}
        flag={flag}
        item={item}
      >
        {item?.title}
      </CommonDayPlanChip>

      {subSchedules?.length > 0 && (
        <Styled.SubDayPlanWrapper isOpen={isOpen} ref={subscheduleRef} id="subSchedule-wrapper">
          <SubDayPlan subschedules={subSchedules} categoryColorCode={item?.categoryColorCode} />
        </Styled.SubDayPlanWrapper>
      )}
      {/* 브라우저 리플로우 방지를 위한 이벤트 핸들용 가상돔 */}
      {currentHoverItem === 'daily' &&
        currentDraggingItem?.flag === 'daily' &&
        !isDragging &&
        isDragMode && (
          <div>
            <Styled.EventHandleTopDom
              key={item?._id}
              index={idx * 3.8}
              id={item?._id}
              onDragEnter={() => {
                handleDragEnter('top', idx, item?._id);
              }}
            />
            <Styled.EventHandleBottomDom
              key={item?._id}
              index={idx * 3.8}
              id={item?._id}
              onDragEnter={() => {
                handleDragEnter('bottom', idx, item?._id);
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
            /* z-index: 1; */
          `
        : css`
            transition: max-height 0.15s ease-out;
            max-height: 1.2rem;
            /* z-index: -1; */
          `}
  `,
  EventHandleBottomDom: styled.div<{ index: number }>`
    width: 21rem;
    height: calc(100% - 1.6rem);
    position: absolute;
    z-index: 5;
    background: red;
    opacity: 0.3;
    top: 1.6rem;
  `,
  EventHandleTopDom: styled.div<{ index: number }>`
    width: 21rem;
    height: 1.6rem;
    position: absolute;
    z-index: 5;
    background: blue;
    opacity: 0.3;
    top: 0;
  `,
};
