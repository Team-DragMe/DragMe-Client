import React from 'react';
import styled from 'styled-components';

import NavBar from '../../components/common/NavBar';

function Day() {
  return (
    <Styled.Root>
      <NavBar />
      데이페이지입니다.
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
