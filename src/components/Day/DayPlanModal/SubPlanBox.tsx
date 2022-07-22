import DeleteButton from 'public/assets/DeleteButton.svg';
import { useEffect, useRef } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import SubPlanTitle from './SubPlanTitle';

interface SubPlan {
  id: number;
  title: string;
}

interface SubPlanBoxProps {
  subPlan: SubPlan[];
  handleAddSubPlan: (newSubPlan: SubPlan[]) => void;
  handleChangeSubPlan: (changeSubPlan: SubPlan) => void;
  handleDeleteSubPlan: (deleteSubPlan: SubPlan) => void;
}

function SubPlanBox(props: SubPlanBoxProps) {
  const subPlanRef = useRef<HTMLDivElement>(null);
  const { subPlan, handleChangeSubPlan, handleDeleteSubPlan } = props;
  useEffect(() => {
    subPlanRef.current!.scrollTop = subPlanRef.current!.scrollHeight;
  }, [subPlan]);
  return (
    <Styled.Root ref={subPlanRef}>
      {subPlan.map((subPlan: SubPlan) => (
        <Styled.InputSubPlan key={subPlan.id}>
          <Styled.Button>
            <SubPlanTitle subPlan={subPlan} handleChangeSubPlan={handleChangeSubPlan} />
          </Styled.Button>
          <Styled.DeleteButtonWrapper onClick={() => handleDeleteSubPlan(subPlan)}>
            <DeleteButton />
          </Styled.DeleteButtonWrapper>
        </Styled.InputSubPlan>
      ))}
    </Styled.Root>
  );
}

export default SubPlanBox;

const Styled = {
  Root: styled.div`
    margin-top: 5.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-height: 8rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  InputSubPlan: styled.div`
    height: 2.4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 0.05rem solid ${theme.colors.letter_grey};
    &:hover svg {
      opacity: 1;
    }
    svg {
      opacity: 0;
    }
  `,
  Button: styled.button`
    display: flex;
    gap: 0.2rem;
    flex-direction: column;
    background-color: ${theme.category.cate_white};
    border: 0;
    width: 19.2rem;
    height: 1.8rem;
    padding: 0;
    margin-bottom: 0.2rem;
    & > input {
      font-size: 1.2rem;
      border: none;
      padding: 0;
      &::placeholder {
        font-size: 1rem;
        line-height: 150%;
        color: ${theme.colors.letter_grey};
      }
      line-height: 150%;
      font-style: normal;
      font-weight: 500;
    }
    hr {
      width: 21.6rem;
      border: 0.05rem solid ${theme.colors.letter_grey};
      margin-top: 0.2rem;
      margin: 0rem;
    }
  `,
  DeleteButtonWrapper: styled.div``,
};
