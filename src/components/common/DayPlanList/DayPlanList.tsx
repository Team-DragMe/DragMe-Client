/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import DayPlanSettingModal from 'src/components/Day/DayPlanSettingModal';
import { FLAG } from 'src/constants';
import usePatchDayToReschedule from 'src/hooks/query/usePatchDayToReschedule';
import usePatchCompletedSchedules from 'src/hooks/query/usePatchDayToReschedule';
import usePatchDayToRoutine from 'src/hooks/query/usePatchDayToRoutine';
import usePatchRescheduleToDay from 'src/hooks/query/usePatchRescheduleToDay';
import useThrottle from 'src/hooks/useThrottle';
import {
  currentDraggintElement,
  currentHoverFlag,
  dailyPlanList,
  dayInfo,
  modalClickXY,
  reschedulePlanList,
  routinePlanList,
  scrollY,
} from 'src/states';
import { theme } from 'src/styles/theme';
import { dailyPlanFlag, Schedule } from 'src/types';
import styled, { css } from 'styled-components';

import AddDayPlanChip from '../DayPlanChip/AddDayPlanChip';
import CommonDayPlanChip from '../DayPlanChip/CommonDayPlanChip';
import DayPlan, { movePlanChipParams, positionType } from './DayPlan';

export interface moveItemInSectionParams extends Schedule {
  type: positionType;
  index?: number;
  hoverId?: string;
}
interface UlStyleProps {
  maxHeight: string;
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
interface DayPlanListProps {
  flag: dailyPlanFlag;
  maxHeight?: string;
  schedulesData?: Schedule[];
  [key: string]: any;
}

function DayPlanList({ maxHeight = '45rem', flag, schedulesData, ...props }: DayPlanListProps) {
  const [currentSection, setCurrentSection] = useState<dailyPlanFlag>(flag);
  const [dailyscheduleData, setDailyScheduleData] = useRecoilState(dailyPlanList);
  const [rescheduleData, setRescheduleData] = useRecoilState(reschedulePlanList);
  const [routineScheduleData, setRoutineScheduleData] = useRecoilState(routinePlanList);
  const setScrollData = useSetRecoilState(scrollY);
  const setPosXY = useSetRecoilState(modalClickXY);
  const [currentDragChipState, setCurrentDragChipState] = useState<movePlanChipParams | null>(null);
  const currentDragChip = useRef<movePlanChipParams | null>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const [addPlan, setAddPlan] = useState(false);
  const [currentDraggingItem, setCurrentDraggingItem] = useRecoilState(currentDraggintElement);
  const [currentHoverItem, setCurrentHoverItem] = useRecoilState(currentHoverFlag);
  const today = useRecoilValue(dayInfo);
  const currentDayDate = today.slice(0, 10);
  const queryClient = useQueryClient();
  const [afterOrder, setAfterOrder] = useState(false);

  const { mutate: DayToRescheduleMutate } = usePatchDayToReschedule({
    scheduleId: currentDraggingItem._id,
    schedule: currentDraggingItem,
    date: currentDayDate,
    hoverFlag: currentHoverItem,
  });
  const { mutate: RescheduleToDayMutate } = usePatchRescheduleToDay({
    scheduleId: currentDraggingItem._id,
    schedule: currentDraggingItem,
    date: currentDayDate,
    hoverFlag: currentHoverItem,
  });

  const { mutate: DayToRoutineMutate } = usePatchDayToRoutine({
    scheduleId: currentDraggingItem._id,
    schedule: currentDraggingItem,
    date: currentDayDate,
    hoverFlag: currentHoverItem,
  });
  /* item flag에 따라 드롭할 수 있는 영역 수정 */
  const getAcceptableEl = (currentType: string) => {
    switch (currentType) {
      case 'daily':
        return [FLAG.DAILY, FLAG.reschedule, FLAG.ROUTINE];
      case 'routine':
        return [FLAG.DAILY];
      case 'reschedule':
        return [FLAG.DAILY];
      default:
        return [FLAG.DAILY];
    }
  };
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
      throttleChangeCurrentSection(flag);
      setCurrentHoverItem(flag);
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

  // hover =

  // 드랍되었을 때 실행될 함수
  const endToMovePlanChip = ({ hoverFlag, hoverIndex, ...item }: movePlanChipParams) => {
    console.log('>드랍됫어!!', currentDraggingItem);
    console.log('>currentHoverItem!!', currentHoverItem);
    // currentDragChipState를 서버로 요청
    // optimistic update
    switch (currentHoverItem) {
      case 'daily':
        // 일간 계획 요청 api post
        // 자주 사용 -> 일간 (복사)
        // 미룰 -> 일간 (삭제)
        RescheduleToDayMutate();

        break;
      case 'reschedule':
        // 계획 미루기 api post
        // 일간 -> 미룰 (삭제)
        console.log('>>>>reschedule', currentHoverItem);
        DayToRescheduleMutate();

        // queryClient.setQueryData(['daily', currentDayDate], (oldSchedules: any) => {
        //   const newData = oldSchedules?.data?.data?.schedules.filter(
        //     (o: Schedule) => o._id !== currentDraggingItem._id,
        //   );
        //   console.log('>>optimisticData 일간 -> 미룰 (삭제)', newData);
        //   return newData;
        // });
        break;
      case 'routine':
        // 자주 사용하는 계획 api post
        // 일간 -> 자주 (복사)
        DayToRoutineMutate();
        break;
      default:
        break;
    }
    currentDragChip.current = null;
    setCurrentDragChipState(null);
  };

  // move planBlock section to section
  const movePlanChip = ({ hoverFlag, hoverIndex, ...item }: movePlanChipParams) => {
    currentDragChip.current = { hoverFlag, hoverIndex, ...item, isFake: true };
    if (!isActive) {
      return;
    }
    // 이 경우엔 내부에서 순서 바뀌어야 하므로 return
    if (item.flag === 'daily' && hoverFlag === 'daily') {
      return;
    }

    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentDragChipState({ hoverFlag, hoverIndex, ...item, isFake: true });
  };

  const changeCurrentSection = (flag: dailyPlanFlag) => {
    setCurrentSection(flag);
  };

  // deprecated
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
        case 'reschedule':
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

  const findDailyIndex = (_id: string) => {
    const planChip = dailyscheduleData.filter((o) => `${o._id}` === _id)[0];
    return {
      planChip,
      index: dailyscheduleData.indexOf(planChip),
    };
  };

  // move planBlock in section
  const moveItemInSection = ({ type, index, hoverId, ...item }: moveItemInSectionParams) => {
    if (!currentDragChip.current) {
      return;
    }

    const { index: currentItemIndex, planChip: currentItemObj } = findDailyIndex(
      currentDragChip.current?._id as string,
    );
    const { index: hoverItemIndex, planChip: hoverItemObj } = findDailyIndex(hoverId as string);

    console.log('$$$$$$$$$$$$$$$$$$호버인덱스', hoverItemIndex);
    // 일단 미리 업데이트 시키는 로직
    const snapShotOfPreviousData = queryClient.getQueryData(['daily', currentDayDate])?.data?.data
      ?.schedules;
    console.log('>>>.snapShotData', snapShotOfPreviousData);
    update(snapShotOfPreviousData, {
      $splice: [
        [currentItemIndex, 1],
        [hoverItemIndex, 0, currentItemObj as Schedule],
      ],
    });
    console.log('>>snapShotOfPreviousData', snapShotOfPreviousData);
    // queryClient.setQueryData(['daily', currentDayDate], () => snapShotOfPreviousData);
    // setDailyScheduleData(
    //   update(dailyscheduleData, {
    //     $splice: [
    //       [currentItemIndex, 1],
    //       [hoverItemIndex, 0, currentItemObj as Schedule],
    //     ],
    //   }),
    // );
  };

  const handleAddClick = () => {
    setAddPlan(true);
    // @TODO 할 일 등록 이후 false로 초기화
    setTimeout(() => {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleScroll = (e: React.WheelEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      setScrollData(e.currentTarget.scrollTop);
      setPosXY({ posX: 0, posY: 0, scheduleId: '', flag, date: '' });
    }
  };

  const throttleMovePlanChip = useThrottle(movePlanChip, 300);
  const throttleChangeCurrentSection = useThrottle(changeCurrentSection, 300);
  const throttleResetFakeItem = useThrottle(resetFakeItem, 300);
  const thorottleMoveItemInSection = useThrottle(moveItemInSection, 100);

  return (
    <Styled.Root {...props}>
      <Styled.UlWrapper
        maxHeight={maxHeight}
        ref={sectionDropRef}
        flag={flag}
        isOver={isOver}
        onWheel={handleScroll}
      >
        {/* <DayPlanSettingModal /> */}
        {/* {isOver && <Styled.DropWrapper canDrop={canDrop} maxHeight={maxHeight} />} */}
        <Styled.Ul maxHeight={maxHeight}>
          {schedulesData?.map((item, idx) => (
            <DayPlan
              item={item}
              key={item._id}
              idx={idx}
              movePlanChip={throttleMovePlanChip}
              endToMovePlanChip={endToMovePlanChip}
              flag={flag}
              dataLength={schedulesData.length}
              isDragMode={isActive}
              thorottleMoveItemInSection={thorottleMoveItemInSection}
            />
          ))}
          {isActive && currentDraggingItem && (
            <Styled.ScrollEnd>
              <DayPlan
                item={currentDraggingItem}
                idx={schedulesData?.length ? schedulesData.length : 0}
                movePlanChip={throttleMovePlanChip}
                endToMovePlanChip={endToMovePlanChip}
                thorottleMoveItemInSection={thorottleMoveItemInSection}
                flag={flag}
                isFake
              />
            </Styled.ScrollEnd>
          )}
          {addPlan && (
            <Styled.Li>
              <CommonDayPlanChip
                color="#FFFFFF"
                shape="rectangle"
                flag={flag}
                item={item}
                index={schedulesData?.length ? schedulesData.length + 1 : 1}
              />
              <div ref={scrollEndRef} />
            </Styled.Li>
          )}
          {isOver && <div ref={scrollEndRef} />}
          <div ref={scrollEndRef} />
        </Styled.Ul>
      </Styled.UlWrapper>
      {flag !== FLAG.reschedule && (
        <Styled.AddDayPlanChipWrapper>
          <AddDayPlanChip onClick={handleAddClick} />
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
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
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
    padding-top: 1.3rem;
  `,
  Li: styled.li`
    margin: 0;
    padding: 0;
    width: 21rem;
    height: fit-content;
    list-style-type: none;
    position: relative;
  `,
  EventHandleDom: styled.div<{ index: number }>`
    width: 21rem;
    height: 3.6rem;
    position: absolute;
    z-index: 5;
    background: red;
    opacity: 0.3;
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
