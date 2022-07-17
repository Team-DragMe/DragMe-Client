import DotIcon from 'public/assets/ic_dot.svg';
import React, { useRef } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface WeeklyGoalInputProps {
  idx: number;
}

function WeeklyGoalInput(props: WeeklyGoalInputProps) {
  const { idx } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@TODO inputRef.current?.value 서버에 전송.....이아니라 서버랑 이야기....
    console.log(inputRef.current?.value);
  };

  return (
    <Styled.Root onSubmit={handleSubmit}>
      <DotIcon />
      <input ref={inputRef} placeholder={idx === 0 ? '이번 주 목표를 세워보세요' : ''} />
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
