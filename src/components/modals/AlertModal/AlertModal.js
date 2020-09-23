import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

AlertModal.propTypes = {
  children: PropTypes.string,
  handleOnOk: PropTypes.func,
  handleOnCancel: PropTypes.func,
}

function AlertModal({ children, handleOnOk, handleOnCancel }) {
  return ReactDom.createPortal(
    <ErrorWrapper>
      <ErrorModal>
        <InfoMessage>{children}</InfoMessage>
        <ActionWrapper>
          <Action type="cancel" color="" onClick={handleOnCancel}>
            ABBRECHEN
          </Action>
          <Action type="confirm" onClick={handleOnOk}>
            JA, ALLES LÖSCHEN
          </Action>
        </ActionWrapper>
      </ErrorModal>
    </ErrorWrapper>,
    document.getElementById('portal')
  )
}

export default AlertModal

const ErrorWrapper = styled.div`
  background-color: white;
  bottom: 0;
  height: auto;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`

const ErrorModal = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  position: fixed;
  align-items: center;
`

const ErrorMessage = styled.h2`
  color: red;
  font-size: 20px;
  padding: 10px 0;
  text-align: center;
`

const InfoMessage = styled.p`
  font-size: 2.5em;
  color: var(--button-cancel);
  padding: 0 10px;
  text-align: center;
`
const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`
const Action = styled.button`
  all: unset;
  font-size: 1em;
  border-radius: 50px;
  border: ${(props) =>
    props.type === 'cancel' ? 'none' : '4px solid var(--button-cancel)'};
  color: ${(props) =>
    props.type === 'cancel' ? 'none' : 'var(--button-cancel)'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 30px;
  padding: 20px;
`
