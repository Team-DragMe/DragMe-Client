import React, { useEffect, useState } from 'react';
import usePostInformationData from 'src/hooks/query/usePostInformationData';
import useDebouncing from 'src/hooks/useDebouncing';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface MonthlyGoalInputProps {
  monthlygoal: string;
  date: string;
}

function MonthlyGoalInput(props: MonthlyGoalInputProps) {
  const { monthlygoal, date } = props;
  const [value, setValue] = useState('');
  const { mutate: postMonthlyGoal } = usePostInformationData();
  const { onChange } = useDebouncing({
    handlePost: postMonthlyGoal,
    date: date.slice(0, 7) + '-01',
    type: 'monthlyGoal',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLTextAreaElement) {
      setValue(e.target.value);
      onChange(e);
    }
  };

  useEffect(() => {
    setValue(monthlygoal);
  }, [monthlygoal]);

  return (
    <Styled.Root>
      <Styled.TextareaWrapper>
        <textarea
          placeholder={'이번 달 목표를 세워보세요'}
          onChange={changeHandler}
          value={value}
        />
      </Styled.TextareaWrapper>
    </Styled.Root>
  );
}

export default MonthlyGoalInput;

const Styled = {
  Root: styled.div``,
  TextareaWrapper: styled.div`
    width: 24.3rem;
    height: 31.5rem;
    border: 0;
    outline: 0;
    background-color: ${theme.colors.scroll_grey};
    padding: 1.8rem;
    & > textarea {
      display: flex;
      justify-content: center;
      width: 20.7rem;
      height: 27.9rem;
      color: ${theme.colors.letter_black};
      ::placeholder {
        color: ${theme.colors.letter_grey};
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.44rem;
      }
      border: 0;
      background-color: ${theme.colors.scroll_grey};
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 150%;
      &:focus {
        outline: none;
      }
      resize: none;
    }
  `,
};
