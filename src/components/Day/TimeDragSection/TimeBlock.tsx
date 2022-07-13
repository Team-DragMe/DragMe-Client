import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  handleDragState: (isDragging: boolean) => void;
  start: string;
  end: string;
  setStart: Dispatch<SetStateAction<string>>;
  setEnd: Dispatch<SetStateAction<string>>;
}

function TimeBlock(props: timeType) {
  const { id, hour, min, isDragging, isExpected, handleDragState, setStart, setEnd, start, end } =
    props;
  const { ...dragInfo } = useDragBlockTest(isDragging, handleDragState, setStart, setEnd);

  const [draged, setDraged] = useState('');

  useEffect(() => {
    if (parseInt(start) <= id && id <= parseInt(end)) {
      isExpected ? setDraged('done') : setDraged('plan');
    } else if (parseInt(start) >= id && id >= parseInt(end)) {
      setDraged('');
    }
  }, [end]);

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
