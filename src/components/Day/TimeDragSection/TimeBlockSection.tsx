import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import useGetPlanData from 'src/hooks/query/useGetPlanData';
// import { timeBlockSchedules } from 'src/mock-data/schedules';
import { scrollY } from 'src/states';
import { planDataType } from 'src/types';
import styled from 'styled-components';

import TimeBlocks from './TimeBlocks';

function TimeBlockSection() {
  //리코일에 있는 열려있는 리스트 값 받아오기
  const divRef = useRef<HTMLDivElement>(null);
  const scroll = useRecoilValue(scrollY);
  const router = useRouter();
  const planDate = router.query.date?.slice(0, 10) || '';
  const { data } = useGetPlanData({ type: 'daily', planDate });
  const timeBlockData: planDataType[] = data?.data || [];

  console.log(timeBlockData);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = scroll;
    }
  }, [scroll]);

  return (
    <Styled.Root ref={divRef}>
      {timeBlockData.map((el) => (
        <TimeBlocks key={el.id} schedule={el} />
      ))}
    </Styled.Root>
  );
}

export default TimeBlockSection;

const Styled = {
  Root: styled.div`
    display: flex;
    position: absolute;
    top: 7rem;
    flex-direction: column;
    gap: 1.2rem;
    margin-left: 1.95rem;
    height: 42.8rem;
    overflow-y: hidden;
  `,
};
