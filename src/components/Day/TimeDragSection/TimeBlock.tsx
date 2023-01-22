import { useEffect, useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface timeType {
  id: number;
  isUsed: boolean;
  startBlock: number;
  endBlock: number;
  isDraged: string;
}

function TimeBlock(props: timeType) {
  const { id, isUsed, startBlock, endBlock, isDraged } = props;

  const [draged, setDraged] = useState(isDraged);

  useEffect(() => {
    if (startBlock <= id && id <= endBlock) {
      isUsed ? setDraged('done') : setDraged('plan');
    }
    if (startBlock >= id && id >= endBlock) {
      setDraged('');
    }
    if (startBlock === id && endBlock === id) {
      if (draged === '') {
        isUsed ? setDraged('done') : setDraged('plan');
      } else {
        setDraged('');
      }
    }
  }, [endBlock]);

  return <Styled.Block id={`${id}`} hourEnd={id % 4 === 3} draged={draged} />;
}

export default TimeBlock;

const Styled = {
  Block: styled.div<{ hourEnd: boolean; draged: string }>`
    display: flex;
    flex-shrink: 0;
    margin-right: ${({ hourEnd }) => (hourEnd ? '0.7rem' : '0.4rem')};
    border: 1px solid ${theme.colors.hour_line};
    cursor: pointer;
    width: 1.8rem;
    height: 3.2rem;
    background-color: ${({ draged }) =>
      draged === 'plan' ? theme.colors.hour_fill : draged === 'done' && theme.colors.main_color};
  `,
};
