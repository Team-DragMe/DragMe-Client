import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
// import useGetSubSchedules from 'src/hooks/query/useGetSubSchedules';
import useGetTodaySchedules from 'src/hooks/query/useGetTodaySchedules';
import { dayInfo, openedSchedules, scrollY } from 'src/states';
import styled from 'styled-components';

import TimeBlocks from './TimeBlocks';

// interface TimeBlockSectionProps {
//   plans: string[];
// }

function TimeBlockSection() {
  //리코일에 있는 열려있는 리스트 값 받아오기
  // const openList = ['sampleScheduleId6'];
  const divRef = useRef<HTMLDivElement>(null);
  const scroll = useRecoilValue(scrollY);
  const date = useRecoilValue(dayInfo).slice(0, 10);
  const openedList = useRecoilValue(openedSchedules);
  const { data: scheduleList } = useGetTodaySchedules({ date });
  // console.log(openedList.has('sampleScheduleId6'));
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = scroll;
    }
  }, [scroll]);

  return (
    <Styled.Root ref={divRef}>
      {scheduleList?.map((el, idx) => {
        // 포함여부 판단해서 열려있고 subSchdules가 0이 아니면 map 돌기
        if (openedList.has(el._id) && el.subSchedules.length > 0) {
          return (
            <>
              <TimeBlocks key={el._id} schedule={el} subScheduleId={''} idx={idx} />
              {el.subSchedules.map((subEl, subIdx) => (
                <TimeBlocks key={subEl} schedule={el} subScheduleId={subEl} idx={subIdx} />
              ))}
            </>
          );
        }
        return <TimeBlocks key={el._id} schedule={el} subScheduleId={''} idx={idx} />;
      })}
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
