import useDragBlock from 'src/hooks/useDragBlock';
import { planDataType } from 'src/types';
import { getTimeArray } from 'src/utils/dateUtil';
import styled from 'styled-components';

import TimeBlock from './TimeBlock';

interface TimeBlocksProps {
  schedule: planDataType;
}

function TimeBlocks({ schedule }: TimeBlocksProps) {
  const { timeArr } = getTimeArray();

  const scheduleInfo = schedule;

  const handleSubmit = () => {
    //서버 요청
  };

  //서버에서 가져온 데이터 블럭 생성
  const isDraged = (id: number) => {
    if (scheduleInfo?.fulfillTime.includes(id)) {
      return 'done';
    } else if (scheduleInfo?.planTime.includes(id)) {
      return 'plan';
    }
    return '';
  };

  const { startBlock, endBlock, ...dragInfo } = useDragBlock({ handleSubmit });

  return (
    <Styled.Root id={scheduleInfo?.id} {...dragInfo}>
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
