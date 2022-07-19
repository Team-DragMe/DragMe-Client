import { theme } from 'src/styles/theme';
import styled from 'styled-components';

interface SubPlan {
  id: number;
  title: string;
}
interface SubPlanTitleButtonProps {
  subPlan: SubPlan[];
  handleAddSubPlan: (newSubPlan: SubPlan[]) => void;
}

function SubPlanTitleButton({ subPlan, handleAddSubPlan }: SubPlanTitleButtonProps) {
  const handleButtonClick = () => {
    console.log(subPlan);
    handleAddSubPlan([
      ...subPlan,
      {
        id: subPlan.length + 1,
        title: '',
      },
    ]);
  };
  return (
    <Styled.Root>
      <Styled.Button onClick={handleButtonClick}>
        <h2>+ 하위항목 추가하기 </h2>
      </Styled.Button>
    </Styled.Root>
  );
}

export default SubPlanTitleButton;

const Styled = {
  Root: styled.div`
    padding-top: 0.4rem;
  `,
  Button: styled.button`
    display: flex;
    background-color: ${theme.category.cate_white};
    border: 0;
    border-bottom: 0.05rem solid ${theme.colors.letter_grey};
    width: 21.6rem;
    height: 1.8rem;
    padding: 0;
    h2 {
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${theme.colors.letter_grey};
      font-weight: 500;
    }
  `,
};
