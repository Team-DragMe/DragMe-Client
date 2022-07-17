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
  handleSubmit: (title: string) => void;
}

function SubPlanTitle(props: SubPlanTitleProps) {
  const { subPlan } = props;
  const [title, setTitle] = useState(subPlan.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setTitle(e.target.value);
      subPlan.title = title;
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
      font-size: 1.2rem;
      border: none;
      padding: 0;
      &::placeholder {
        font-size: 1rem;
        line-height: 1.5rem;
        color: ${theme.colors.letter_grey};
      }
      line-height: 150%;
      font-style: normal;
      font-weight: 500;
    }
  `,
};
