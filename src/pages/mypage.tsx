import AccountSection from 'src/components/MyPage/AccountSection';
import ConnectSection from 'src/components/MyPage/ConnectSection';
import InfoSection from 'src/components/MyPage/InfoSection';
import MyInfoSection from 'src/components/MyPage/MyInfoSection';
import styled from 'styled-components';

function MyPage() {
  return (
    <Styled.Root>
      <Styled.Main>
        <MyInfoSection />
        <AccountSection />
        <ConnectSection />
        <InfoSection />
      </Styled.Main>
      <Styled.Footer />
    </Styled.Root>
  );
}

export default MyPage;

const Styled = {
  Root: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Main: styled.body`
    width: 84.3rem;
    padding-top: 18rem;
    padding-bottom: 16rem;
  `,
  Footer: styled.footer``,
};
