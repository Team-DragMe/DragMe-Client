import { useEffect, useState } from 'react';
import useDragBlockTest from 'src/hooks/useDragBlock';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

const LAST_MINIT_OF_HOUR = 45;

interface timeType {
  id: number;
  hour: number;
  min: number;
  isDragging: boolean;
  isExpected: boolean;
  handleDragState: (isDragging: boolean, startBlock: string, endBlock: string) => void;
  startBlock: string;
  endBlock: string;
}

function TimeBlock(props: timeType) {
  const { id, hour, min, isDragging, isExpected, handleDragState, startBlock, endBlock } = props;
  const { ...dragInfo } = useDragBlockTest(isDragging, handleDragState);

  const [draged, setDraged] = useState('');

  useEffect(() => {
    if (parseInt(startBlock) <= id && id <= parseInt(endBlock)) {
      isExpected ? setDraged('done') : setDraged('plan');
    } else if (parseInt(startBlock) >= id && id >= parseInt(endBlock)) {
      setDraged('');
    }
  }, [endBlock]);

  return (
    <Styled.Block id={`${id}`} key={`${hour}:${min}`} min={min} draged={draged} {...dragInfo} />
  );
}

export default TimeBlock;

const Styled = {
  Block: styled.div<{ min: number; draged: string }>`
    display: flex;
    flex-shrink: 0;
    margin-right: ${({ min }) => (min === LAST_MINIT_OF_HOUR ? '0.7rem' : '0.4rem')};
    border: 1px solid ${theme.colors.hour_line};
    cursor: pointer;
    width: 1.8rem;
    height: 3.2rem;
    background-color: ${({ draged }) =>
      draged === 'plan' ? theme.colors.hour_fill : draged === 'done' && theme.colors.main_color};
  `,
};
