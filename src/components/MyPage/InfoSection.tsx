import { MYPAGE_LETTER } from 'src/constants/mypage';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function InfoSection() {
  return (
    <Styled.Root>
      <Styled.LeftInfo>
        <button>{MYPAGE_LETTER.INQUIRY_FEEDBACK}</button>
        <button>{MYPAGE_LETTER.PRIVACY_POLICY}</button>
      </Styled.LeftInfo>
      <button>{MYPAGE_LETTER.LOGOUT}</button>
    </Styled.Root>
  );
}

export default InfoSection;

const Styled = {
  Root: styled.section`
    display: flex;
    justify-content: space-between;
    margin-top: 2.2rem;

    & button {
      font-weight: 700;
      font-size: 1.2rem;
      background-color: white;
      border: 0;
      padding: 0;
      color: ${theme.colors.info_grey};
    }
  `,
  LeftInfo: styled.div`
    display: flex;
    margin-left: 0.3rem;
    gap: 2.2rem;
  `,
};
