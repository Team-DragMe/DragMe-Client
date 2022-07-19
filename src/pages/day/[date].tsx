import React from 'react';
import styled from 'styled-components';

import NavBar from '../../components/common/NavBar';

function Day() {
  return (
    <Styled.Root>
      <NavBar />
    </Styled.Root>
  );
}

export default Day;

const Styled = {
  Root: styled.div``,
};
