import { useState } from 'react';
/* 
    사용방법: const { value, onChange } = useDebouncing();
    onChange에 onChange를 담아서 사용, value 사용
*/
function useDebouncing() {
  const [value, setValue] = useState<string>();
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);

    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        //TODO: 서버 함수 실행
      } catch (e) {
        console.error('error', e);
      }
    }, 2500);
    setTimer(newTimer);
  };

  return { value, onChange };
}

export default useDebouncing;
