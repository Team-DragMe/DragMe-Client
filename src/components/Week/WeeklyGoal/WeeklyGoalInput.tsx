import DotIcon from 'public/assets/ic_dot.svg';
import React, { useRef, useState } from 'react';
import usePostInformationData from 'src/hooks/query/usePostInformationData';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface WeeklyGoalInputProps {
  idx: number;
  content: string;
  date: string;
}

function WeeklyGoalInput(props: WeeklyGoalInputProps) {
  const { idx, content, date } = props;
  const [value, setValue] = useState(content);
  const inputRef = useRef<HTMLInputElement>(null);
  const goalType = `weeklyGoal${idx}`;
  const { mutate: postInformation } = usePostInformationData();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postInformation({ date, type: goalType, value: inputRef.current?.value || '' });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Styled.Root onSubmit={handleSubmit}>
      <DotIcon />
      <input
        ref={inputRef}
        placeholder={idx === 0 ? '이번 주 목표를 세워보세요' : ''}
        value={value}
        onChange={onChange}
      />
    </Styled.Root>
  );
}

export default WeeklyGoalInput;

const Styled = {
  Root: styled.form`
    display: flex;
    border-bottom: 0.12rem solid ${theme.colors.plan_check};
    width: 100%;
    height: 3.2rem;
    align-items: center;

    & > input {
      width: 100%;
      margin-left: 1.2rem;
      border: 0;
      outline: 0;
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 120%;
      padding: 0;
      color: ${theme.colors.letter_black};
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
        'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
        sans-serif;
      ::placeholder {
        color: ${theme.colors.letter_grey};
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
          'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
          sans-serif;
      }
    }
  `,
};
