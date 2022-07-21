import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface timeType {
  id: number;
  isUsed: boolean;
  startBlock: string;
  endBlock: string;
  isDraged: string;
  setIsClickMakeBlock: Dispatch<SetStateAction<boolean>>;
}

function TimeBlock(props: timeType) {
  const { id, isUsed, startBlock, endBlock, isDraged, setIsClickMakeBlock } = props;

  const [draged, setDraged] = useState(isDraged);

  useEffect(() => {
    if (parseInt(startBlock) === id && parseInt(endBlock) === id) {
      if (draged === '') {
        isUsed ? setDraged('done') : setDraged('plan');
        setIsClickMakeBlock(true);
      } else {
        setDraged('');
        setIsClickMakeBlock(false);
      }
    } else if (parseInt(startBlock) <= id && id <= parseInt(endBlock)) {
      isUsed ? setDraged('done') : setDraged('plan');
    } else if (parseInt(startBlock) >= id && id >= parseInt(endBlock)) {
      setDraged('');
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
