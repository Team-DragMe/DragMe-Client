import { useState } from 'react';
import styled from 'styled-components';

function TodayPlanInput() {
  const [todayPlan, setTodayPlan] = useState<string>();
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodayPlan(e.target.value);
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
    <StyledTodayPlanInput.Root>
      <StyledTodayPlanInput.Input
        placeholder="오늘 하루 계획 및 다짐을 입력해주세요."
        onChange={handleChange}
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
      color: #d8dbde;
    }
  `,
  Hr: styled.hr`
    margin: 0;
    border: 0.1rem solid;
    padding: 0;
    width: 47.3rem;
    color: #d8dbde;
  `,
};
