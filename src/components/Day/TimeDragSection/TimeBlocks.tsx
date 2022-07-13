import { useState } from 'react';
import { theme } from 'src/styles/theme';
import { getTimeArray } from 'src/utils/timeArray';
import styled from 'styled-components';

import TimeBlock from './TimeBlock';

interface timeType {
  hour: number;
  min: number;
}

const LAST_MINIT_OF_HOUR = 45;

function TimeBlocks() {
  const { timeArr } = getTimeArray();
  const [isDragging, setIsDragging] = useState(false);
  // const [isPlus, setIsPlus] = useState(true);
  const [isExpected] = useState(false);
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');

  const handleDragState = (isDragging: boolean, startBlock: string, endBlock: string) => {
    setIsDragging(isDragging);
    if (startBlock !== '') {
      setStartBlock(startBlock);
    }
    if (endBlock !== '') {
      setEndBlock(endBlock);
    }
  };

  return (
    <Styled.Root>
      {timeArr.map((el: timeType, idx: number) => (
        <TimeBlock
          id={idx}
          key={`${el.hour}:${el.min}`}
          hour={el.hour}
          min={el.min}
          isDragging={isDragging}
          handleDragState={handleDragState}
          isExpected={isExpected}
          startBlock={startBlock}
          endBlock={endBlock}
        />
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
    cursor: pointer;
    width: 1.8rem;
    height: 3.2rem;
  `,
};
