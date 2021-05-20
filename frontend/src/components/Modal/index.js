import React from 'react'
import {
  Container,
  Backdrop,
  ModalContainer,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalButton,
} from './styled'
import CrossIcon from '../Icons/CrossIcon'
import PropTypes from 'prop-types'

const Modal = ({
  confirm,
  cancel,
  open,
  setOpen,
  title,
  buttons,
  children,
}) => {
  const confirmHandler = () => {
    confirm()
  }
  const cancelHandler = () => {
    cancel()
  }
  const setOpenHandler = (bool) => {
    setOpen(bool)
  }
  return (
    <Container style={{ display: open ? 'block' : 'none' }}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <i onClick={(e) => setOpenHandler(false)}>
            <CrossIcon />
          </i>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {cancel && (
            <ModalButton className="cancel" onClick={cancelHandler}>
              Cancel
            </ModalButton>
          )}

          {confirm && (
            <ModalButton className="confirm" onClick={confirmHandler}>
              Confirm
            </ModalButton>
          )}
        </ModalFooter>
      </ModalContainer>
      <Backdrop />
    </Container>
  )
}
Modal.prototype = {
  title: PropTypes.string.isRequired,
  button: PropTypes.array.isRequired,
  setOpen: PropTypes.func.isRequired,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
}
export default Modal
