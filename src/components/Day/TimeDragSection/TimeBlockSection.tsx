import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { timeBlockSchedules } from 'src/mock-data/schedules';
import { scrollY } from 'src/states';
import styled from 'styled-components';

import TimeBlocks from './TimeBlocks';

function TimeBlockSection() {
  //리코일에 있는 열려있는 리스트 값 받아오기
  const divRef = useRef<HTMLDivElement>(null);
  const scroll = useRecoilValue(scrollY);
  // const date = useRecoilValue(dayInfo).slice(0, 10);
  // const { data: scheduleList } = useGetTodaySchedules({ date });

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = scroll;
    }
  }, [scroll]);

  return (
    <Styled.Root ref={divRef}>
      {timeBlockSchedules.map((el) => (
        <TimeBlocks key={el._id} schedule={el} />
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
