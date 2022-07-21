import { schedules } from 'src/mock-data/schedules';
import styled from 'styled-components';

import TimeBlocks from './TimeBlocks';

// interface TimeBlockSectionProps {
//   plans: string[];
// }

function TimeBlockSection() {
  //리코일에 있는 열려있는 리스트 값 받아오기
  const openList = ['sampleScheduleId6'];

  return (
    <Styled.Root>
      {schedules.map((el) => {
        // 포함여부 판단해서 열려있고 subSchdules가 0이 아니면 map 돌기
        if (openList.includes(el._id) && el.subSchedules.length > 0) {
          return (
            <>
              <TimeBlocks key={el._id} schedule={el} />
              {el.subSchedules.map((el) => (
                <TimeBlocks key={el._id} schedule={undefined} />
              ))}
            </>
          );
        }
        return <TimeBlocks key={el._id} schedule={el} />;
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
    overflow-y: scroll;
  `,
};
