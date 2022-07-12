import { getTimeArray } from 'src/utils/timeArray';
import styled from 'styled-components';

interface timeType {
  hour: number;
  min: number;
}

function TimeBlocks() {
  const { timeArr } = getTimeArray();

  return (
    <Styled.Root>
      {timeArr.map((el: timeType) => (
        <Styled.Block key={`${el.hour}:${el.min}`} min={el.min} />
      ))}
    </Styled.Root>
  );
}

export default TimeBlocks;

const Styled = {
  Root: styled.div`
    display: flex;
    width: fit-content;
    /* margin-bottom: 1.2rem; */
  `,
  Block: styled.div<{ min: number }>`
    display: flex;
    flex-shrink: 0;
    margin-right: ${({ min }) => (min === 45 ? '0.7rem' : '0.4rem')};
    /* 아직 컬러 코드가 나오지 않아 나오면 pr수정하겠습니다. */
    border: 1px solid #e3e6ea;
    border-radius: 0.5px;
    cursor: pointer;
    width: 1.8rem;
    height: 3.2rem;
  `,
};
