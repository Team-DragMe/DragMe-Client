import { MYPAGE_LETTER } from 'src/constants/mypage';
import { mypageInfo } from 'src/mock-data/mypage';
import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function AccountSection() {
  return (
    <Styled.Root>
      <Styled.Title>{MYPAGE_LETTER.ACCOUNT}</Styled.Title>
      <Styled.Account>{mypageInfo.email}</Styled.Account>
      <Styled.AccountDescribe>{MYPAGE_LETTER.ACCOUNT_DESCRIBE}</Styled.AccountDescribe>
    </Styled.Root>
  );
}

export default AccountSection;

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    padding: 6.8rem 0;
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
  AccountDescribe: styled.p`
    font-size: 1.2rem;
    font-weight: 400;
  `,
};
