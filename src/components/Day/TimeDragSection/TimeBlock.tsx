import useDragBlockTest from 'src/hooks/useTest';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

const LAST_MINIT_OF_HOUR = 45;

interface timeType {
  hour: number;
  min: number;
  isDragging: boolean;
  isPlus: boolean;
  isEstimated: boolean;
  handleDragState: (isDragging: boolean, isPlus: boolean) => void;
}

function TimeBlock(props: timeType) {
  const { hour, min, isPlus, isDragging, isEstimated, handleDragState } = props;
  const { ...dragInfo } = useDragBlockTest(isDragging, isPlus, isEstimated, handleDragState);

  return <Styled.Block key={`${hour}:${min}`} min={min} {...dragInfo} />;
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
