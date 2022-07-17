import { theme } from 'src/styles/theme';
import styled from 'styled-components';

import ColorPicker from './ColorPicker';
import DayPlanTitle from './DayPlanTitle';
import SubPlanBox from './SubPlanBox';
import SubPlanTitleButton from './SubPlanTitleButton';

interface SubPlan {
  id: number;
  title: string;
}

function DayPlanModal() {
  const subPlanList: SubPlan[] = [
    { id: 1, title: '드래그미 팀원과 밥 먹기' },
    { id: 2, title: '팀원들과 놀기' },
  ]; //TODO: 서버로부터 SubPlan[] get해오기

  return (
    <Styled.Root>
      <Styled.Head />

      <Styled.Content>
        <form onSubmit={handleSubmitForm}>
          <Styled.Input>
            <ColorPicker onChange={handleChangeColor} />
            <DayPlanTitle onChange={handleChangeTitle} />
          </Styled.Input>
          <Styled.Highlight />
          <Styled.SubPlan>
            <SubPlanBox subPlanList={subPlanList} onChange={handleChangeSubplan} />
            <SubPlanTitleButton />
          </Styled.SubPlan>
        </form>
      </Styled.Content>

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
  Content: styled.div`
    padding-left: 2.2rem;
    padding-right: 2.2rem;
    padding-top: 4rem;
    padding-bottom: 6rem;
  `,
  Input: styled.div`
    display: flex;
    gap: 0.8rem;
    margin-bottom: 0.2rem;
    position: relative;
  `,
  Highlight: styled.hr`
    width: 21.6rem;
    margin: 0;
    border: 0.05rem solid ${theme.colors.plan_grey};
    z-index: 1;
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
    padding-left: 14.8rem;
    padding-right: 2.2rem;
    display: flex;
    margin: 0;
    gap: 2.8rem;
    position: relative;
    bottom: 0.2rem;
  `,
  Cancel: styled.a`
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
