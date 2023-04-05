import { theme } from 'src/styles/theme';
import styled from 'styled-components';

function InfoSection() {
  return (
    <Styled.Root>
      <Styled.LeftInfo>
        <button>문의 및 피드백</button>
        <button>개인정보보호 정책</button>
      </Styled.LeftInfo>
      <button>로그아웃</button>
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
