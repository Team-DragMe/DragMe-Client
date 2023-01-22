import { useState } from 'react';
import useDragBlock from 'src/hooks/useDragBlock';
import { Schedule } from 'src/types';
import { getTimeArray } from 'src/utils/dateUtil';
import styled from 'styled-components';

import TimeBlock from './TimeBlock';

interface DragStateArg {
  isDragging: boolean;
  startBlock: string;
  endBlock: string;
}

interface TimeBlocksProps {
  schedule: Schedule;
}

function TimeBlocks({ schedule }: TimeBlocksProps) {
  const { timeArr } = getTimeArray();
  const [isDragging, setIsDragging] = useState(false);
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const scheduleInfo = schedule;

  const handleDragState = ({ isDragging, startBlock, endBlock }: DragStateArg) => {
    setIsDragging(isDragging);
    if (startBlock !== '') {
      setStartBlock(startBlock);
    }
    if (endBlock !== '') {
      setEndBlock(endBlock);
    }
  };

  const handleSubmit = () => {
    //서버 요청
  };

  //서버에서 가져온 데이터 블럭 생성
  const isDraged = (id: number) => {
    if (scheduleInfo?.usedTime.includes(id)) {
      return 'done';
    } else if (scheduleInfo?.estimatedTime.includes(id)) {
      return 'plan';
    }
    return '';
  };

  const { ...dragInfo } = useDragBlock({ isDragging, handleDragState, handleSubmit });
  return (
    <Styled.Root id={scheduleInfo?._id} {...dragInfo}>
      {timeArr.map((el: number) => (
        <TimeBlock
          id={el}
          key={el}
          isUsed={scheduleInfo.isCompleted || false}
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
