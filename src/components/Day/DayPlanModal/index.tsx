import { useState } from 'react';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import ColorPicker from './ColorPicker';
import DayPlanTitle from './DayPlanTitle';
import SubPlanBox from './SubPlanBox';
import SubPlanTitleButton from './SubPlanTitleButton';

interface Plan {
  parentId: string;
  // parentDate: string;
  title: string;
  parentCategoryColor: string;
  subPlan: SubPlan[];
}
interface SubPlan {
  id: number;
  title: string;
}

function DayPlanModal() {
  //TODO: 서버로부터 SubPlan[] 따로 가져오기
  const subPlanList: SubPlan[] = [{ id: 1, title: '드래그미 팀원과 밥 먹기' }];

  //TODO: 서버로부터 Plan GET 가져오기(plan은 임시데이터임)
  const plan: Plan = {
    parentId: '1',
    title: '드래그미 팀원 만나서 행복해요',
    parentCategoryColor: '#FFFFFF',
    subPlan: subPlanList,
  };

  const [color, setColor] = useState(plan.parentCategoryColor);
  const handleChangeColor = (newColor: string) => {
    setColor(newColor);
  };

  const [title, setTitle] = useState(plan.title);
  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const [subPlan, setSubPlan] = useState(plan.subPlan);
  const handleAddSubPlan = (newSubPlan: SubPlan[]) => {
    const newSetSubPlan = [...newSubPlan];
    setSubPlan(newSetSubPlan);
  };

  const handleChangeSubPlan = (changeSubPlan: SubPlan) => {
    subPlan.map((plan) => {
      if (plan.id === changeSubPlan.id) {
        plan.title = changeSubPlan.title;
      }
    });
    const changedSubPlan = [...subPlan];
    setSubPlan(changedSubPlan);
  };

  const handleDeleteSubPlan = (deleteSubPlan: SubPlan) => {
    const deletedSubPlan = subPlan.filter((plan) => plan.id !== deleteSubPlan.id);
    setSubPlan(deletedSubPlan);
    //TODO: delete api 붙여서 해당 하위목록 삭제기능
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlan: Plan = {
      parentId: plan.parentId,
      title,
      parentCategoryColor: color,
      subPlan,
    };
    //TODO: 서버로 newPlan POST 하기
  };

  return (
    <Styled.Root>
      <Styled.Head />
      <form onSubmit={handleSubmitForm}>
        <Styled.Input>
          <ColorPicker newColor={color} handleChangeColor={handleChangeColor} />
          <DayPlanTitle title={title} handleChangeTitle={handleChangeTitle} />
        </Styled.Input>
        <Styled.SubPlan>
          <SubPlanBox
            subPlan={subPlan}
            handleAddSubPlan={handleAddSubPlan}
            handleChangeSubPlan={handleChangeSubPlan}
            handleDeleteSubPlan={handleDeleteSubPlan}
          />
          <SubPlanTitleButton subPlan={subPlan} handleAddSubPlan={handleAddSubPlan} />
        </Styled.SubPlan>
      </form>

      <Styled.SubmitForm>
        <Styled.Cancel>취소</Styled.Cancel>
        <Styled.SubmitButton type="submit">완료</Styled.SubmitButton>
      </Styled.SubmitForm>
    </Styled.Root>
  );
}

export default DayPlanModal;

const Styled = {
  Root: styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 26rem;
    height: 31rem;
    border-radius: 0.2rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    background-color: ${theme.category.cate_white};
  `,
  Head: styled.div`
    width: 26rem;
    height: 2.8rem;
    background-color: ${theme.colors.letter_grey};
    border: 0.1rem solid ${theme.category.cate_white};
    border-radius: 0.2rem;
  `,
  Input: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding-top: 4rem;
    padding-bottom: 0.2rem;
    border-bottom: 0.5px solid ${theme.colors.letter_grey};
    position: relative;
  `,
  SubPlan: styled.section`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    display: flex;
    gap: 0.4rem;
    padding: 0;
    margin: 0;
  `,
  SubmitForm: styled.div`
    width: 26rem;
    display: flex;
    margin: 0;
    gap: 2.8rem;
    position: absolute;
    left: 14.8rem;
    top: 27.2rem;
    bottom: 0.2rem;
  `,
  Cancel: styled.a`
    cursor: pointer;
    color: ${theme.colors.letter_grey};
    border: 0;
    padding: 0;
    font-weight: 500;
    font-style: normal;
    font-size: 1rem;
    line-height: 150%;
  `,
  SubmitButton: styled.button`
    width: 4.4rem;
    height: 1.8rem;
    color: ${theme.category.cate_white};
    background-color: ${theme.colors.main_color};
    border: 0;
    padding: 0;
    font-weight: 500;
    font-style: normal;
    font-size: 1rem;
    line-height: 150%;
    border-radius: 0.2rem;
  `,
};
