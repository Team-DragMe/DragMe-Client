import { useState } from 'react';
import styled from 'styled-components';

function TodayNote() {
  const [todayNote, setTodayNote] = useState<string>();
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodayNote(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        //서버와 api 통신
        console.log('저장');
      } catch (e) {
        console.error('error', e);
      }
    }, 2500);
    setTimer(newTimer);
  };
  return (
    <StyledTodayNote.Root>
      <StyledTodayNote.Textarea
        placeholder="오늘 하루 노트를 작성해보세요."
        onChange={handleChange}
        value={todayNote}
      />
    </StyledTodayNote.Root>
  );
}

export default TodayNote;

const StyledTodayNote = {
  Root: styled.div`
    width: 108.5rem;
    height: 11rem;
    margin-top: 1.2rem;
    padding: 1.6rem 2rem;
    background-color: #f8f9fb;
    border-radius: 0.2rem;
  `,
  Textarea: styled.textarea`
    background-color: #f8f9fb;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    &::placeholder {
      color: #d8dbde;
    }
  `,
};
