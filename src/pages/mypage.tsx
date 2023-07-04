import AccountSection from 'src/components/MyPage/AccountSection';
import ConnectSection from 'src/components/MyPage/ConnectSection';
import InfoSection from 'src/components/MyPage/InfoSection';
import MyInfoSection from 'src/components/MyPage/MyInfoSection';
import useGetMyPageData from 'src/hooks/query/useGetMyPageData';
import { myInfo } from 'src/types/myPage';
import styled from 'styled-components';

function MyPage() {
  const { data } = useGetMyPageData();
  const myInfo = data?.data;
  return (
    <Styled.Root>
      <Styled.Main>
        <MyInfoSection {...myInfo} />
        <AccountSection {...myInfo} />
        <ConnectSection {...myInfo} />
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
  Main: styled.section`
    width: 84.3rem;
    padding-top: 18rem;
    padding-bottom: 16rem;
  `,
  Footer: styled.footer`
    width: 100%;
    height: 30.4rem;
    background-image: url('/assets/Footer.png');
    background-size: cover;
  `,
};
