import React, { useState } from 'react';
import MainDayPlan from 'src/components/Day/MainDayPlan';
import styled from 'styled-components';

function Day() {
  const schedules = [
    {
      _id: 'sampleScheduleId',
      date: '2022-08-08',
      timeSets: [
        {
          startTime: {
            hour: '14',
            minute: '30',
          },
          endTime: {
            hour: '15',
            minute: '30',
          },
          isExpected: false,
        },
        {
          startTime: {
            hour: '14',
            minute: '30',
          },
          endTime: {
            hour: '16',
            minute: '00',
          },
          isExpected: true,
        },
      ],
      title: '드래그미 회의',
      subSchedules: [
        {
          _id: 'sampleSubScheduleId',
        },
        {
          _id: 'sampleSubScheduleId2',
        },
      ],
      categoryColorCode: '#EAC96E',
      userId: 'sampleUserId',
      isCompleted: true,
      isReschedule: false,
      isRoutine: false,
      orderIndex: 1,
    },
    {
      _id: 'sampleScheduleId',
      date: '2022-08-08',
      timeSets: [
        {
          startTime: {
            hour: '14',
            minute: '30',
          },
          endTime: {
            hour: '15',
            minute: '30',
          },
          isExpected: false,
        },
        {
          startTime: {
            hour: '14',
            minute: '30',
          },
          endTime: {
            hour: '16',
            minute: '00',
          },
          isExpected: true,
        },
      ],
      title: 'QnRNfnQldQhd',
      subSchedules: [],
      categoryColorCode: '#F67F6F',
      userId: 'sampleUserId',
      isCompleted: false,
      isReschedule: false,
      isRoutine: false,
      orderIndex: 1,
    },
  ];
  return (
    <Styled.Root>
      데이페이지입니다.
      <MainDayPlan schedules={schedules} />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
