import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function DayPlanTitle() {
  return <Styled.TitleInput placeholder="제목 및 시간 추가(12자 이내 입력)" />;
}

export default DayPlanTitle;

const Styled = {
  TitleInput: styled.input`
    width: 17.1rem;
    height: 1.8rem;
    border: none;
    &::placeholder {
      color: ${theme.colors.letter_grey};
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  `,
};
