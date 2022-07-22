import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import usePostInformationData from 'src/hooks/query/usePostInformationData';
import useDebouncing from 'src/hooks/useDebouncing';
import { dayInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface TodayNoteProps {
  memo: string;
}

function TodayNote({ memo }: TodayNoteProps) {
  const today = useRecoilValue(dayInfo);
  const date = today.slice(0, 10);
  const [value, setValue] = useState(memo);
  const { mutate: postMemo } = usePostInformationData();
  const { onChange } = useDebouncing({
    date,
    type: 'memo',
    handlePost: postMemo,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLTextAreaElement) {
      setValue(e.target.value);
      onChange(e);
    }
  };

  useEffect(() => {
    setValue(memo);
  }, [memo]);

  return (
    <StyledTodayNote.Root>
      <StyledTodayNote.Textarea
        placeholder="자유롭게 메모를 작성해보세요."
        value={value}
        onChange={changeHandler}
      />
    </StyledTodayNote.Root>
  );
}

export default TodayNote;

const StyledTodayNote = {
  Root: styled.div`
    width: 108.5rem;
    height: 16.4rem;
    margin-top: 1.2rem;
    padding: 1.6rem 2rem;
    background-color: ${theme.colors.scroll_grey};
    border-radius: 0.2rem;
  `,
  Textarea: styled.textarea`
    background-color: ${theme.colors.scroll_grey};
    resize: none;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    &::placeholder {
      color: ${theme.colors.letter_grey};
    }
    &:focus {
      color: ${theme.colors.letter_black};
      outline: 0;
    }
  `,
};
