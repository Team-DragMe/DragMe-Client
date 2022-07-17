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
    font-weight: 500;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }
  body > div {
    height: 100%;
  }

  button:hover {
    cursor: pointer
  }
`;

export default GlobalStyles;
