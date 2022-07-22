import { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { submitSubPlanData, subPlanClientData } from 'src/states';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface SubPlan {
  id: number;
  title: string;
}

interface SubPlanTitleProps {
  subPlan: SubPlan;
  handleChangeSubPlan: (changeSubPlan: SubPlan) => void;
}

function SubPlanTitle(props: SubPlanTitleProps) {
  const { subPlan, handleChangeSubPlan } = props;
  const [title, setTitle] = useState(subPlan.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setTitle(e.target.value);
      subPlan.title = title;
      handleChangeSubPlan(subPlan);
    }
  };

  return (
    <Styled.Root>
      <Styled.Input
        placeholder="하위항목 입력하세요"
        value={title}
        onChange={handleChange}
        // onKeyPress={handleKeydown}
      />
    </Styled.Root>
  );
}

export default SubPlanTitle;

const Styled = {
  Root: styled.section`
    display: flex;
    justify-content: space-between;
  `,
  Input: styled.input`
    width: 19.2rem;
    border: none;
    padding: 0;
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${theme.colors.letter_grey};
      font-weight: 500;
    }
    &:focus {
      outline: none;
    }
    line-height: 150%;
    font-style: normal;
    font-weight: 500;
  `,
};
