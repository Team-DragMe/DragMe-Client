import { useState } from 'react';
import useDragBlock from 'src/hooks/useDragBlock';
import { getTimeArray } from 'src/utils/dateUtil';
import styled from 'styled-components';

import TimeBlock from './TimeBlock';

interface DragStateArg {
  isDragging: boolean;
  startBlock: string;
  endBlock: string;
}

interface TimeBlocksProps {
  blocksId: string;
}

function TimeBlocks({ blocksId }: TimeBlocksProps) {
  const { timeArr } = getTimeArray();
  const [isDragging, setIsDragging] = useState(false);
  const [isUsed] = useState(false);
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  //임시 더미데이터 from 서버
  const testData = { id: 'tempId1', isUsed: true, timeBlockNumbers: [82, 83, 84, 85, 86] };

  const handleDragState = ({ isDragging, startBlock, endBlock }: DragStateArg) => {
    setIsDragging(isDragging);
    if (startBlock !== '') {
      setStartBlock(startBlock);
    }
    if (endBlock !== '') {
      setEndBlock(endBlock);
    }
  };

  //배열 만들어서 서버에 전송
  const handleSubmit = () => {
    const blockList = [];
    const start = parseInt(startBlock);
    const end = parseInt(endBlock);
    console.log(startBlock, endBlock);
    for (let i = start < end ? start : end; i <= (start < end ? end : start); i++) {
      blockList.push(i);
    }

    console.log(blockList);
  };

  //서버에서 가져온 데이터 블럭 생성
  const isDraged = (id: number) => {
    if (testData.id === blocksId && testData.timeBlockNumbers.includes(id)) {
      return testData.isUsed ? 'done' : 'plan';
    }
    return '';
  };

  const { ...dragInfo } = useDragBlock({ isDragging, handleDragState, handleSubmit });
  return (
    <Styled.Root id={blocksId} {...dragInfo}>
      {timeArr.map((el: number) => (
        <TimeBlock
          id={el}
          key={el}
          isUsed={isUsed}
          startBlock={startBlock}
          endBlock={endBlock}
          isDraged={isDraged(el)}
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
};
