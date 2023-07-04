import { MYPAGE_LETTER } from 'src/constants/mypage';
import { mypageInfo } from 'src/mock-data/mypage';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';
import { myInfo } from 'src/types/myPage';

function ConnectSection(myInfo: myInfo) {
  return (
    <Styled.Root>
      <Styled.Title>{MYPAGE_LETTER.CONNECTION}</Styled.Title>
      <Styled.Account>{myInfo.email}</Styled.Account>
    </Styled.Root>
  );
}

export default ConnectSection;

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    padding-top: 5.3rem;
    padding-bottom: 10.4rem;
    border-bottom: 1px solid ${theme.colors.border_grey};
  `,
  Title: styled.h4`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  `,
  Account: styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.9rem;
  `,
};
