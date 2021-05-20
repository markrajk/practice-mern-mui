import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
`

// export const InputContainer = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   & input {
//     width: 49%;
//   }
// `

export const Input = styled.input`
  ${({ theme }) => css`
    padding: 0.8em 1em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.4em;
    color: ${theme.colors.black};
    border-radius: 8px;
    outline: none !important;
    z-index: 1;

    &::placeholder {
      opacity: 0.7;
    }
  `}
`

export const Results = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
    transform: translate(0, 100%);
  `}
`

export const ResultsItem = styled.div`
  ${({ theme }) => css`
    padding: 1em 1.4em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-of-type) {
      border-bottom: 1px solid ${theme.colors.black};
    }

    & p {
      font-size: 1.4em;
      color: ${theme.colors.black};
    }

    & button {
      padding: 0.5em 1em;
      font-size: 1.4em;
      font-weight: 600;
      color: ${theme.colors.white};
      background-color: ${theme.colors.blue};
      border-radius: 5px;
      border: 0;
      outline: none;
    }
  `}
`
