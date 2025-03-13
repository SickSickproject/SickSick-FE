import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
html, body, #root {
  width: 100%;
  height:1200px;
  margin: 0;
  padding: 0;
//   overflow:auto;
//  &::-webkit-scrollbar {
//     width: 0px; /* 크롬, 사파리에서 스크롤바 숨기기 */
//     height: 0px;
//     display: none;
//   }
}
`

export default Globalstyle