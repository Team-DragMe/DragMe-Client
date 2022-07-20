/* eslint-disable no-case-declarations */
import update from 'immutability-helper';
import dynamic from 'next/dynamic';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { mergeRefs } from 'react-merge-refs';
import { useRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import useThrottle from 'src/hooks/useThrottle';
import { dailyPlanList, reschedulePlanList, routinePlanList } from 'src/states';
import { theme } from 'src/styles/theme';
import { dailyPlanFlag, Schedule } from 'src/types';
import styled from 'styled-components';

import AddDayPlanChip from '../DayPlanChip/AddDayPlanChip';
import DayPlan, { movePlanChipParams } from './DayPlan';

interface UlStyleProps {
  maxHeight: string;
}

interface DayPlanListProps extends UlWrapperStyleProps {
  flag: dailyPlanFlag;
  [key: string]: any;
}
interface UlWrapperStyleProps extends UlStyleProps {
  flag?: dailyPlanFlag;
  isOver?: boolean;
  ref: ConnectDropTarget | HTMLUListElement;
}

interface DropWrapperStyleProps {
  canDrop: boolean;
  maxHeight: string;
}
function DayPlanList({ maxHeight = '44.9rem', flag, ...props }: DayPlanListProps) {
  const [currentSection, setCurrentSection] = useState<dailyPlanFlag>(flag);
  const [dailyscheduleData, setDailyScheduleData] = useRecoilState(dailyPlanList);
  const [rescheduleData, setRescheduleData] = useRecoilState(reschedulePlanList);
  const [routineScheduleData, setRoutineScheduleData] = useRecoilState(routinePlanList);
  const [currentDragChipState, setCurrentDragChipState] = useState<movePlanChipParams | null>(null);
  const currentDragChip = useRef<movePlanChipParams | null>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  /* item flag에 따라 드롭할 수 있는 영역 수정 */
  const getAcceptableEl = (currentType: string) => {
    switch (currentType) {
      case 'daily':
        return [FLAG.DAILY, FLAG.RECHEDULE, FLAG.ROUTINE];
      case 'routine':
        return [FLAG.DAILY];
      case 'rechedule':
        return [FLAG.DAILY];
      default:
        return [FLAG.DAILY];
    }
  };
  /* 현재 스케줄 리스트의 데이터 반환 */
  const getCurrentTypeData = (currentType: string) => {
    switch (currentType) {
      case 'routine':
        return { schedulesData: routineScheduleData, setSchedulesData: setRoutineScheduleData };
      case 'rechedule':
        return { schedulesData: rescheduleData, setSchedulesData: setRescheduleData };
      default:
        return { schedulesData: dailyscheduleData, setSchedulesData: setDailyScheduleData };
    }
  };

  const { schedulesData, setSchedulesData } = getCurrentTypeData(flag);

  const [{ isOver, canDrop, isActive }, sectionDropRef] = useDrop(() => ({
    accept: getAcceptableEl(flag),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    canDrop: (item) => {
      const { flag: itemFlag } = item;

      const availableArea = getAcceptableEl(itemFlag);
      return availableArea.includes(currentSection);
    },
    hover(item, monitor) {
      // console.log('item', item);
      // console.log('flag of dropArea', flag);
      // console.log('item', item);
      throttleChangeCurrentSection(flag);
      // flag, _id, date, index
    },
  }));

  // 순서 바뀌는 로직 안에서 쓰일 애
  const findPlanChip = useCallback(
    (_id: string) => {
      const planChip = dailyscheduleData.filter((o) => o._id === _id)[0];
      return {
        planChip,
        index: dailyscheduleData.indexOf(planChip),
      };
    },
    [dailyscheduleData],
  );

  // 현재 스케줄 받아서 array를 업데이트 -> 내 카드 이전의 애들은 내 전에 가고 / 내 카드 이후에 애들은 내 뒤로 오도록
  // const movePlanChip = useCallback(
  //   (_id: string, atIndex: number) => {
  //     const { planChip, index } = findPlanChip(_id);
  //     // console.log('8888088planChip', planChip);
  //     setSchedulesData(
  //       update(schedulesData, {
  //         $splice: [
  //           [index, 1],
  //           [atIndex, 0, planChip],
  //         ],
  //       }),
  //     );
  //   },
  //   [findPlanChip, schedulesData, setSchedulesData],
  // );

  // 드랍되었을 때 실행될 함수
  const endToMovePlanChip = ({ hoverFlag, hoverIndex, ...item }: movePlanChipParams) => {
    currentDragChip.current = null;
    setCurrentDragChipState(null);
    // currentDragChipState를 서버로 요청
    // optimistic update
    switch (currentDragChipState?.hoverFlag) {
      case 'daily':
        // 일간 계획 요청 api post
        break;
      case 'rechedule':
        // 계획 미루기 api post
        break;
      case 'routine':
        // 자주 사용하는 계획 api post
        break;
      default:
        break;
    }
  };

  // 메인 드래그앤 드랍 함수
  const movePlanChip = ({ hoverFlag, hoverIndex, ...item }: movePlanChipParams) => {
    currentDragChip.current = { hoverFlag, hoverIndex, ...item, isFake: true };

    // ref에 기존 상태 저장
    if (!isActive) {
      return;
    }

    if (item.flag === 'daily' && hoverFlag === 'daily') {
      // 다른 로직
      return;
    }
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    currentDragChip.current = { hoverFlag, hoverIndex, ...item, isFake: false };
    setCurrentDragChipState({ hoverFlag, hoverIndex, ...item, isFake: false });
  };

  const changeCurrentSection = (flag: dailyPlanFlag) => {
    setCurrentSection(flag);
  };

  const resetFakeItem = () => {
    const currentItem = currentDragChip?.current as movePlanChipParams;
    if (!isOver && currentItem?.isFake) {
      switch (currentItem.hoverFlag) {
        case 'routine':
          const copyRoutineData = [...routineScheduleData];
          const lastRoutineItem = copyRoutineData.pop();
          if (lastRoutineItem?.isFake === true) {
            setRoutineScheduleData([...copyRoutineData]);
          }
          break;
        case 'rechedule':
          const copyReschedule = [...rescheduleData];
          const lastRescheduleItem = copyReschedule.pop();

          if (lastRescheduleItem?.isFake === true) {
            setRescheduleData([...copyReschedule]);
          }
          break;
        case 'daily':
          const copyDailyschedule = [...dailyscheduleData];
          const lastDailycheduleItem = copyDailyschedule.pop();
          if (lastDailycheduleItem?.isFake === true) {
            setDailyScheduleData([...copyDailyschedule]);
          }
          break;
        default:
          break;
      }
    }
  };

  const throttleMovePlanChip = useThrottle(movePlanChip, 300);
  const throttleChangeCurrentSection = useThrottle(changeCurrentSection, 300);
  const throttleResetFakeItem = useThrottle(resetFakeItem, 300);

  useEffect(() => {
    console.log('>>>>>>isActive', isActive);
    console.log('>>>>ref', currentDragChip.current);
  }, [isActive]);
  return (
    <Styled.Root {...props}>
      <Styled.UlWrapper maxHeight={maxHeight} ref={sectionDropRef} flag={flag} isOver={isOver}>
        {/* {isOver && <Styled.DropWrapper canDrop={canDrop} maxHeight={maxHeight} />} */}
        <Styled.Ul maxHeight={maxHeight}>
          {schedulesData.map((item, idx) => (
            <DayPlan
              item={item}
              key={item._id}
              idx={idx}
              movePlanChip={throttleMovePlanChip}
              endToMovePlanChip={endToMovePlanChip}
              flag={flag}
            />
          ))}
          {/* {isActive && <div ref={scrollEndRef} />} */}
          {isActive && currentDragChipState && (
            <Styled.ScrollEnd>
              <DayPlan
                item={currentDragChipState}
                idx={schedulesData.length}
                movePlanChip={throttleMovePlanChip}
                endToMovePlanChip={endToMovePlanChip}
                flag={flag}
                isFake
              />
            </Styled.ScrollEnd>
          )}
          <div ref={scrollEndRef} />
        </Styled.Ul>
      </Styled.UlWrapper>
      {flag !== FLAG.RECHEDULE && (
        <Styled.AddDayPlanChipWrapper>
          <AddDayPlanChip />
        </Styled.AddDayPlanChipWrapper>
      )}
    </Styled.Root>
  );
}

export default DayPlanList;

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 23rem;
  `,

  UlWrapper: styled.article<UlWrapperStyleProps>`
    max-height: ${({ maxHeight }) => maxHeight};
    /* overflow-y: ${({ isOver }) => (isOver ? 'hidden' : 'scroll')}; */
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    overflow-y: scroll;
  `,
  DropWrapper: styled.div<DropWrapperStyleProps>`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 230px;
    z-index: 1;
    opacity: 0.1;
    background: ${({ canDrop }) => (canDrop ? theme.colors.main_color : 'red')};
  `,
  Ul: styled.ul<UlStyleProps>`
    min-height: ${({ maxHeight }) => maxHeight};
    width: 21rem;
  `,
  EventHandleDom: styled.div`
    width: 21rem;
  `,
  AddDayPlanChipWrapper: styled.div`
    padding-top: 0.8rem;
    border-top: 1px solid ${theme.colors.plan_grey};
    width: 21rem;
  `,
  ScrollEnd: styled.div`
    width: 100%;
    height: 3.2rem;
  `,
};
