import { theme } from 'src/styles/theme';
import { getTimeArray } from 'src/utils/dateUtil';
import styled from 'styled-components';

interface timeType {
  hour: number;
  min: number;
}

const LAST_MINIT_OF_HOUR = 45;

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
  `,
  Block: styled.div<{ min: number }>`
    display: flex;
    flex-shrink: 0;
    margin-right: ${({ min }) => (min === LAST_MINIT_OF_HOUR ? '0.7rem' : '0.4rem')};
    border: 1px solid ${theme.colors.hour_line};
    border-radius: 0.5px;
    cursor: pointer;
    width: 1.8rem;
    height: 3.2rem;
  `,
};
