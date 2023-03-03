import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import usePostInformationData from 'src/hooks/query/usePostInformationData';
import useDebouncing from 'src/hooks/useDebouncing';
import { dayInfo } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface TodayPlanInputProps {
  dailyGoal: string;
}

function emptyFunc(): void {}

function TodayPlanInput({ dailyGoal }: TodayPlanInputProps) {
  const today = useRecoilValue(dayInfo);
  const date = today.slice(0, 10);
  // const { mutate: postDailyGoal } = usePostInformationData();
  const [value, setValue] = useState(dailyGoal);
  const { onChange } = useDebouncing({
    date,
    type: 'dailyGoal',
    // handlePost: postDailyGoal,
    handlePost: emptyFunc,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setValue(e.target.value);
      onChange(e);
    }
  };

  useEffect(() => {
    setValue(dailyGoal);
  }, [dailyGoal]);

  return (
    <StyledTodayPlanInput.Root>
      <StyledTodayPlanInput.Input
        placeholder="일정 계획을 둘러보며 하루를 마무리 해보세요."
        onChange={changeHandler}
        value={value}
      />
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
    width: 42.3rem;
    height: 2.2rem;
    border: none;
    padding: 0;
    font-size: 1.2rem;
    &::placeholder {
      color: ${theme.colors.letter_grey};
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 150%;
    }
    &:focus {
      color: ${theme.colors.letter_black};
      outline: 0;
    }
    border-bottom: 0.1rem solid ${theme.colors.letter_grey};
  `,
};
