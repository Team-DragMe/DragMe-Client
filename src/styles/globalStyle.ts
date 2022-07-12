import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset}

  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
    background-color: #F5F5F5;
  }
  body > div {
    height: 100%;
  }

  button:hover {
    cursor: pointer
  }
`;

export default GlobalStyles;
