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
    }

    #root {
      height: 100%;
      min-height: 100%;
    }
  `}
`
