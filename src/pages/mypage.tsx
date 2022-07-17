import React from 'react';
import styled from 'styled-components';

import NavBar from '../components/common/NavBar';

function Week() {
  return (
    <Styled.Root>
      <NavBar />
      마이페이지입니다.
    </Styled.Root>
  );
}

export default Week;

const Styled = {
  Root: styled.div``,
};
