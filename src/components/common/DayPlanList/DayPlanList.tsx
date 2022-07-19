import update from 'immutability-helper';
import dynamic from 'next/dynamic';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import { dailyPlanList, reschedulePlanList, routinePlanList } from 'src/states';
import { theme } from 'src/styles/theme';
import { dailyPlanFlag } from 'src/types';
import styled from 'styled-components';

import AddDayPlanChip from '../DayPlanChip/AddDayPlanChip';
import DayPlan from './DayPlan';

interface DayPlanListProps {
  schedules: any;
  maxHeight?: string;
  flag: dailyPlanFlag;
  [key: string]: any;
}

interface UlWrapperStyleProps {
  maxHeight: string;
}

interface UlStyleProps extends UlWrapperStyleProps {
  flag?: dailyPlanFlag;
  ref: ConnectDropTarget;
}
function DayPlanList({ schedules, maxHeight = '44.9rem', flag, ...props }: DayPlanListProps) {
  const [currentSection, setCurrentSection] = useState<dailyPlanFlag>(flag);
  const [dailyscheduleData, setDailyScheduleData] = useRecoilState(dailyPlanList);
  const [rescheduleData, setRescheduleData] = useRecoilState(reschedulePlanList);
  const [routineScheduleData, setRoutineScheduleData] = useRecoilState(routinePlanList);
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
      case 'reschedule':
        return { schedulesData: rescheduleData, setSchedulesData: setRescheduleData };
      default:
        return { schedulesData: dailyscheduleData, setSchedulesData: setDailyScheduleData };
    }
  };

  const { schedulesData, setSchedulesData } = getCurrentTypeData(flag);

  const [{ isOver, canDrop }, sectionDropRef] = useDrop(() => ({
    accept: [FLAG.DAILY, FLAG.RECHEDULE, FLAG.ROUTINE],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      const { flag: itemFlag } = item;

      const availableArea = getAcceptableEl(itemFlag);
      return availableArea.includes(currentSection);
    },
    hover(item, monitor) {
      // console.log('item', item);
      console.log('flag of dropArea', flag);
      console.log('item', item);
      setCurrentSection(flag);
      // flag, _id
    },
  }));

  // 추후 순서 바뀌는 로직 안에서 쓰일 애
  const findPlanChip = useCallback(
    (_id: string) => {
      const planChip = schedulesData.filter((o) => o._id === _id)[0];
      return {
        planChip,
        index: schedulesData.indexOf(planChip),
      };
    },
    [schedulesData],
  );

  // 현재 스케줄 받아서 array를 업데이트 -> 내 카드 이전의 애들은 내 전에 가고 / 내 카드 이후에 애들은 내 뒤로 오도록
  const movePlanChip = useCallback(
    (_id: string, atIndex: number) => {
      const { planChip, index } = findPlanChip(_id);
      // console.log('8888088planChip', planChip);
      setSchedulesData(
        update(schedulesData, {
          $splice: [
            [index, 1],
            [atIndex, 0, planChip],
          ],
        }),
      );
    },
    [findPlanChip, schedulesData, setSchedulesData],
  );

  // 메인 드래그앤 드랍 함수
  const movePlanChipToOtherArea = ({ hoverFlag, originalFlag, itemId }) => {
    switch (originalFlag) {
      case 'daily':
        if (hoverFlag === 'reschedule') {
          // reschedule 데이터에 해당 요소 추가
          // daily 데이터에 해당 요소 삭제
          // 계획 미루기 api 호출
        } else if (hoverFlag === 'routine') {
          // routine 데이터에 해당 요소 추가
          // daily 데이터는 유지
          // 자주 사용하는 계획 등록하기 api 호출
        }
        break;
      case 'reshedule':
        if (hoverFlag !== 'daily') {
          break;
        }

        // daily 데이터에 해당 요소 추가
        // reshedule 데이터에 해당 요소 삭제
        // 일정 계획으로 옮기기 api 호풀

        break;
      default:
        if (hoverFlag !== 'daily') {
          break;
        }
      // daily 데이터에 해당 요소 추가
      // reshedule 데이터에 해당 요소 삭제
      // 일정 계획으로 옮기기 api 호풀
    }
  };

  return (
    <Styled.Root {...props}>
      <Styled.UlWrapper maxHeight={maxHeight}>
        <Styled.Ul maxHeight={maxHeight} ref={sectionDropRef} flag={flag}>
          {/* {isOver && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100px',
                width: '100px',
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: 'red',
              }}
            />
          )} */}
          {schedulesData.map((item, idx) => (
            <DayPlan
              item={item}
              key={item._id}
              idx={idx}
              findPlanChip={findPlanChip}
              movePlanChip={movePlanChip}
              flag={flag}
            />
          ))}
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
    overflow-y: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  Ul: styled.ul<UlStyleProps>`
    min-height: ${({ maxHeight }) => maxHeight};
    width: 21rem;
  `,
  AddDayPlanChipWrapper: styled.div`
    padding-top: 0.8rem;
    border-top: 1px solid ${theme.colors.plan_grey};
    width: 21rem;
  `,
};
