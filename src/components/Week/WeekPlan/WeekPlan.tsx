import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useEmojiListData from 'src/hooks/query/useEmojiListData';
import useGetWeeklySchedules from 'src/hooks/query/useGetWeeklySchedules';
import { weekInfo } from 'src/states';
import { DayStorage } from 'src/utils/getDate';
import styled from 'styled-components';

import WeekPlanCard from './WeekPlanCard';

interface WeekInfoType {
  date: string;
  type: string;
  value: string;
}

function WeekPlan() {
  const router = useRouter();
  const weekRecoil = useRecoilValue(weekInfo);
  const startDate = weekRecoil[0];
  const endDate = weekRecoil[6];
  // const { data: weeklySchedules } = useGetWeeklySchedules({ startDate, endDate });
  const { data } = useEmojiListData({ startDate, endDate });

  const weekInfoData: WeekInfoType[] = data?.data;
  const numberArray = [0, 1, 2, 3, 4, 5, 6];
  const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  return (
    <Styled.Root>
      {weekInfoData &&
        weekRecoil &&
        numberArray.map((number: number, idx: number) => (
          <WeekPlanCard
            key={number}
            dayInfo={weekInfoData[number]}
            day={week[number]}
            dateForWeek={weekRecoil[idx]}
            // schedulesData={weeklySchedules?.data[idx]?.schedules}
            weekIndex={idx}
          />
        ))}
    </Styled.Root>
  );
}

export default WeekPlan;

const Styled = {
  Root: styled.div`
    display: grid;
    grid-template-columns: 25.9rem 25.9rem 25.9rem 25.9rem;
    grid-template-rows: 36rem 36rem;
    row-gap: 1.6rem;
    column-gap: 1.6rem;
    & > div {
      &:nth-child(1) {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
      }
      &:nth-child(2) {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
      }
      &:nth-child(3) {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 2;
      }
      &:nth-child(4) {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
      }
      &:nth-child(5) {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
      }
      &:nth-child(6) {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;
      }
      &:nth-child(7) {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 3;
      }
    }
  `,
};
