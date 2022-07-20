import useDebouncing from 'src/hooks/useDebouncing';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface TodayPlanInputProps {
  note: string;
}

function TodayPlanInput({ note }: TodayPlanInputProps) {
  const { onChange } = useDebouncing(note);

  return (
    <StyledTodayPlanInput.Root>
      <StyledTodayPlanInput.Input
        placeholder="오늘 하루 계획 및 다짐을 입력해주세요."
        onChange={onChange}
      />
      <StyledTodayPlanInput.Hr />
    </StyledTodayPlanInput.Root>
  );
}

export default TodayPlanInput;

const StyledTodayPlanInput = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: left;
  `,
  Input: styled.input`
    margin-top: 0.4rem;
    border: none;
    padding: 0;
    font-size: 1.2rem;
    &::placeholder {
      color: ${theme.colors.letter_grey};
    }
    &:focus {
      color: ${theme.colors.letter_black};
      outline: 0;
    }
  `,
  Hr: styled.hr`
    margin: 0;
    border: 0.1rem solid;
    padding: 0;
    width: 47.3rem;
    color: ${theme.colors.letter_grey};
  `,
};
