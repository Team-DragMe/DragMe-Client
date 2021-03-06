import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { FLAG } from 'src/constants';
import useGetDelaySchedules from 'src/hooks/query/useGetDelaySchedules';
import { reschedules } from 'src/mock-data/schedules';
import { reschedulePlanList } from 'src/states';
import styled from 'styled-components';

import DayPlanList from '../common/DayPlanList/DayPlanList';

const RESCHEDULE = {
  EN: 'RESCHEDULE',
  KO: '우회할 계획',
};

function Reschedule() {
  const reschedulePlanData = useSetRecoilState(reschedulePlanList);
  const { data } = useGetDelaySchedules();
  // useEffect(() => {
  //   data && reschedulePlanData(data);
  // }, [data, reschedulePlanData]);
  return (
    <Styled.Root>
      <Styled.TitleArea>
        <Styled.Title>{RESCHEDULE.EN}</Styled.Title>
        <Styled.SubTitle>{RESCHEDULE.KO}</Styled.SubTitle>
      </Styled.TitleArea>
      <DayPlanList maxHeight="13.3rem" flag={FLAG.reschedule} schedulesData={data} />
    </Styled.Root>
  );
}

export default Reschedule;

const Styled = {
  Root: styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 23rem;
  `,
  TitleArea: styled.div`
    display: flex;
    margin-bottom: 1.2rem;
    margin-left: 1rem;
  `,
  Title: styled.h2`
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
  `,
  SubTitle: styled.h2`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    &::before {
      content: '|';
      margin-left: 0.8rem;
      margin-right: 0.8rem;
    }
  `,
};
