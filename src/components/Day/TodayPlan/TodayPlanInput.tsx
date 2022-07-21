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

function TodayPlanInput({ dailyGoal }: TodayPlanInputProps) {
  const today = useRecoilValue(dayInfo);
  const date = today.slice(0, 10);
  const { mutate: postDailyGoal } = usePostInformationData();
  const [value, setValue] = useState(dailyGoal);
  const { onChange } = useDebouncing({
    date,
    type: 'dailyGoal',
    handlePost: postDailyGoal,
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
        placeholder="오늘 하루 계획 및 다짐을 입력해주세요."
        onChange={changeHandler}
        value={value}
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
