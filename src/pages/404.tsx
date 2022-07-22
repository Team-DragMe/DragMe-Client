import Error from 'public/assets/404PageError.svg';
import styled from 'styled-components';

export default function Custom404() {
  return (
    <Styled.Root>
      <Styled.Error404 />
      <Styled.Title>서버 응답을 받지 못했습니다.</Styled.Title>
      <Styled.Text>
        네트워크 상태를 받지 못했습니다.
        <br /> 문제가 계속되면 잠시 후 다시 시도해주세요.
      </Styled.Text>
    </Styled.Root>
  );
}
const Styled = {
  Root: styled.div`
    position: relative;
    background: #f5f5f5;
    width: 100%;
    height: 84rem;
  `,
  Error404: styled(Error)`
    position: absolute;
    width: 839.37px;
    height: 449px;
    left: 353px;
    top: 150px;
  `,
  Title: styled.p`
    position: absolute;
    width: 318px;
    height: 42px;
    left: 554px;
    top: 614px;
    font-weight: 700;
    font-size: 28px;
    line-height: 150%;
    text-align: center;
    text-transform: uppercase;
  `,
  Text: styled.p`
    position: absolute;
    width: 341px;
    height: 52px;
    left: 543px;
    top: 664px;
    font-weight: 500;
    font-size: 20px;
    line-height: 130%;
    text-align: center;
    text-transform: uppercase;
  `,
};
