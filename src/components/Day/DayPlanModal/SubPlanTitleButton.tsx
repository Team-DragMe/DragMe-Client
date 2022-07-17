import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function SubPlanTitleButton() {
  return (
    <Styled.Root>
      <Styled.Button>
        <h2>+ 하위항목 추가하기 </h2>
      </Styled.Button>
      <hr />
    </Styled.Root>
  );
}

export default SubPlanTitleButton;

const Styled = {
  Root: styled.div`
    margin-top: 0.2rem;
    hr {
      width: 21.6rem;
      border: 0.05rem solid ${theme.colors.letter_grey};
      margin-top: 0.2rem;
      margin: 0;
    }
  `,
  Button: styled.button`
    display: flex;
    background-color: ${theme.category.cate_white};
    border: 0;
    width: 21.6rem;
    height: 1.8rem;
    padding: 0;
    h2 {
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${theme.colors.letter_grey};
    }
  `,
};
