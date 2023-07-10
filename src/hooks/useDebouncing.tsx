import { useState } from 'react';
import { MutateType } from 'src/types/api';
import { FeelRequestType, MemoRequestType } from 'src/types/day';
import usePostFeelData from './query/usePostFeelData';
import usePostMemoData from './query/usePostMemoData';
/* 
    사용방법: const { value, onChange } = useDebouncing();
    onChange에 onChange를 담아서 사용, value 사용
*/

interface useDebouncingProps {
  date: string;
  type: string;
}

function useDebouncing(args: useDebouncingProps) {
  const { date, type } = args;
  const [value, setValue] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);
  const { mutate: postMemo } = usePostMemoData();
  const { mutate: postFeel } = usePostFeelData();
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);

    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        console.log(date, type, e.target.value);
        if (type == 'memo') {
          postMemo({ planDate: date, content: e.target.value });
        } else if (type == 'feel') {
          postFeel({ planDate: date, content: e.target.value });
        }
      } catch (e) {
        console.error('error', e);
      }
    }, 2500);
    setTimer(newTimer);
  };

  return { value, onChange };
}

export default useDebouncing;
