import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useGetSubSchedules from 'src/hooks/query/useGetSubSchedules';
import usePatchScheduleTime from 'src/hooks/query/usePatchScheduleTime';
import usePostScheduleTime from 'src/hooks/query/usePostScheduleTime';
import useDragBlock from 'src/hooks/useDragBlock';
import { checkedSchedules } from 'src/states';
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
  subScheduleId: string;
  idx: number;
}

function TimeBlocks({ schedule, subScheduleId, idx }: TimeBlocksProps) {
  const { timeArr } = getTimeArray();
  const checkedList = useRecoilValue(checkedSchedules);
  const { mutate: postScheduleTime } = usePostScheduleTime();
  const { mutate: patchScheduleTime } = usePatchScheduleTime();
  const [isDragging, setIsDragging] = useState(false);
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [isClickMakeBlock, setIsClickMakeBlock] = useState(false);
  const { data: subSchedule } = useGetSubSchedules({
    scheduleId: schedule?._id || '',
    isAbled: subScheduleId !== undefined,
    flag: 'daily',
  });
  const scheduleInfo = subScheduleId === '' ? schedule : subSchedule ? subSchedule[idx] : schedule;
  // const scheduleInfo =
  //   subScheduleId === undefined ? schedule : subSchedule ? subSchedule[idx] : schedule;

  const [isUsed, setIsUsed] = useState(scheduleInfo?.isCompleted);

  useEffect(() => {
    setIsUsed((prev) => !prev);
  }, [checkedList.has(scheduleInfo?._id)]);

  const handleDragState = ({ isDragging, startBlock, endBlock }: DragStateArg) => {
    setIsDragging(isDragging);
    if (startBlock !== '') {
      setStartBlock(startBlock);
    }
    if (endBlock !== '') {
      setEndBlock(endBlock);
    }
  };

  // console.log(scheduleInfo?.isCompleted);
  //배열 만들어서 서버에 전송
  const handleSubmit = () => {
    const blockList = [];
    const start = parseInt(startBlock);
    const end = parseInt(endBlock);
    for (let i = start < end ? start : end; i <= (start < end ? end : start); i++) {
      blockList.push(i);
    }

    //start, end로 요청 추가, 삭제 분기처리
    if (start < end) {
      console.log('생성 배열', blockList);
      postScheduleTime({
        scheduleId: scheduleInfo?._id || '',
        isUsed: isUsed || false,
        timeBlockNumbers: blockList,
      });
    } else if (start > end) {
      //삭제요청
      console.log('삭제 배열', blockList);
      patchScheduleTime({
        scheduleId: scheduleInfo?._id || '',
        timeBlockNumbers: blockList,
      });
    } else if (start === end) {
      if (isClickMakeBlock) {
        console.log('클릭 하나 생성', blockList);
        postScheduleTime({
          scheduleId: scheduleInfo?._id || '',
          isUsed: isUsed || false,
          timeBlockNumbers: blockList,
        });
      } else {
        console.log('클릭 하나 삭제', blockList);
        patchScheduleTime({
          scheduleId: scheduleInfo?._id || '',
          timeBlockNumbers: blockList,
        });
      }
    }
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
          isUsed={isUsed || false}
          startBlock={startBlock}
          endBlock={endBlock}
          isDraged={isDraged(el)}
          setIsClickMakeBlock={setIsClickMakeBlock}
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
