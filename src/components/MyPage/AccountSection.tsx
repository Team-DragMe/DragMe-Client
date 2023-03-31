import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function AccountSection() {
  return (
    <Styled.Root>
      <Styled.Title>계정</Styled.Title>
      <Styled.Account>dragme.kr@gmail.com</Styled.Account>
      <Styled.AccountDescribe>구글 계정으로 로그인 중이에요!</Styled.AccountDescribe>
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
