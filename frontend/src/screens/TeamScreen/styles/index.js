import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 3em 4em;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
  `}
`
export const Content = styled.div`
  /* max-width: 80em; */
`

export const Header = styled.div`
  ${({ theme }) => css`
    margin-bottom: 2em;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & i {
      margin-left: 0.6em;
      font-size: 2.5em;
      color: ${theme.colors.black};
      cursor: pointer;
      transition: transform 0.1s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  `}
`

export const Button = styled.button`
  ${({ theme }) => css`
    display: inline-block;
    margin-left: auto;
    padding: 0.6em 1.2em;
    font-size: 1.6em;
    font-weight: 600;
    color: ${theme.colors.white};

    border-radius: 5px;
    border: 0;
    outline: none;
    cursor: pointer;

    &.deny {
      background-color: ${theme.colors.red};
    }

    &.confirm {
      background-color: ${theme.colors.blue};
    }
  `}
`

const StyledEditable = styled.span`
  display: inline-block;
  font-size: inherit;
  color: inherit;
  font-family: inherit;
  font-weight: inherit;
  background-color: transparent;
  border: ${(props) =>
    props.edit ? '1px solid black' : '1px solid transparent'};
  outline: none !important;
  border-radius: 5px;
`
export const Editable = ({ onInput, edit, children }) => {
  return (
    <StyledEditable
      edit={edit}
      suppressContentEditableWarning
      contentEditable={edit}
      onInput={onInput}
    >
      {children}
    </StyledEditable>
  )
}

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: 3em;
    color: ${theme.colors.black};
    letter-spacing: 0.5px;
  `}
`
export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    text-align: left;
    border: 1px solid black;
    border-collapse: collapse;

    & tr {
      &.input-row {
        font-size: 0.9em;

        & div {
          max-width: 500px;

          & input {
            padding: 0.5em 1em;
          }

          & button {
            margin: 0 !important;
          }
        }
      }
    }

    & th,
    td {
      padding: 0.5rem 1rem;
      vertical-align: center;
    }

    & thead {
      & th {
        font-size: 1.4em;
        font-weight: 600;
        letter-spacing: 0.15px;
        color: ${theme.colors.white};
        background-color: ${theme.colors.black};
        border: 1px solid black;
        cursor: pointer;
      }
    }

    & tbody {
      & td {
        font-size: 1.4em;
        font-weight: 500;
        border: 1px solid black;

        &.job-title {
          & i {
            font-size: 1.5em;
          }
          & div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        & a {
          color: ${theme.colors.black};
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        & button {
          margin: 0 auto;
          display: block;
          padding: 0.4em 1em;
          font-size: 1em;
          font-weight: 600;
          color: ${theme.colors.white};
          letter-spacing: 0.25px;
          border-radius: 5px;
          border: 0;
          outline: none;
          cursor: pointer;

          &.delete {
            background-color: ${theme.colors.red};
          }
        }
      }
    }
  `}
`
