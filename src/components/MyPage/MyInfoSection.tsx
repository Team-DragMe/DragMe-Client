import PencilIcon from 'public/assets/ic_pencil.svg';
import styled from 'styled-components';

function MyInfoSection() {
  return (
    <Styled.Root>
      <Styled.ProfileInfoWrapper>
        <Styled.NameWrapper>
          <p>전희선</p>
          <Styled.PencilBtn />
        </Styled.NameWrapper>
        <Styled.GoalWrapper />
      </Styled.ProfileInfoWrapper>
    </Styled.Root>
  );
}

export default MyInfoSection;

const Styled = {
  Root: styled.section`
    display: flex;
  `,
  ProfileInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  NameWrapper: styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
    line-height: 150%;
    gap: 1.3rem;
  `,
  GoalWrapper: styled.div`
    display: flex;
  `,
  PencilBtn: styled(PencilIcon)`
    cursor: pointer;
  `,
};
