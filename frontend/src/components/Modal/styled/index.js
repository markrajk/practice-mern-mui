import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
`

export const Backdrop = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: ${theme.colors.black};
    opacity: 0.2;
  `}
`

export const ModalContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 50em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.black};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
    z-index: 100;
  `}
`

export const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 2em;

  & i {
    font-size: 2.5em;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 50%);
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translate(-50%, 50%) scale(1.1);
    }
  }
`

export const ModalBody = styled.div`
  width: 100%;
  flex: 1;
  padding: 2em;
`

export const ModalFooter = styled.div`
  width: 100%;
  padding: 2em;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
`
export const ModalTitle = styled.h2`
  font-size: 2.5em;
  letter-spacing: 0.3px;
`
export const ModalButton = styled.button`
  ${({ theme }) => css`
    margin-left: 0.6em;
    padding: 0.6em 1.2em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4em;
    font-weight: 600;
    letter-spacing: 0.15px;
    color: ${theme.colors.white};
    border-radius: 5px;
    border: 0;
    outline: none;
    text-transform: capitalize;
    cursor: pointer;

    &.confirm {
      background-color: ${theme.colors.blue};
    }

    &.cancel {
      background-color: ${theme.colors.red};
    }
  `}
`
