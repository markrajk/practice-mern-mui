import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  ${({ theme }) => css`
    *,
    *::after,
    &::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }

    html {
      /* font-size: 62.5%; */
    }

    body {
      height: 100vh;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      /* background-color: ${theme.colors.background} */

      /* overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      } */
    }

    #root {
      height: 100%;
      min-height: 100%;
    }
  `}
`
