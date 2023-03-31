import AccountSection from 'src/components/MyPage/AccountSection';
import ConnectSection from 'src/components/MyPage/ConnectSection';
import MyInfoSection from 'src/components/MyPage/MyInfoSection';

function MyPage() {
  return (
    <main>
      <MyInfoSection />
      <AccountSection />
      <ConnectSection />
    </main>
  );
}

export default MyPage;
