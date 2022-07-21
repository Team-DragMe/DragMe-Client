import useDebouncing from 'src/hooks/useDebouncing';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface TodayNoteProps {
  memo: string;
}

function TodayNote({ memo }: TodayNoteProps) {
  const { ...debouncingInfo } = useDebouncing(memo);
  return (
    <StyledTodayNote.Root>
      <StyledTodayNote.Textarea placeholder="오늘 하루 노트를 작성해보세요." {...debouncingInfo} />
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
    background-color: ${theme.colors.scroll_grey};
    border-radius: 0.2rem;
  `,
  Textarea: styled.textarea`
    background-color: ${theme.colors.scroll_grey};
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
