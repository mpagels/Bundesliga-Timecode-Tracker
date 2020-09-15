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
        <ErrorMessage>ACHTUNG</ErrorMessage>
        <InfoMessage>{children}</InfoMessage>
        <ActionWrapper>
          <Action type="cancel" color="" onClick={handleOnCancel}>
            NEIN
          </Action>
          <Action type="confirm" onClick={handleOnOk}>
            JA
          </Action>
        </ActionWrapper>
      </ErrorModal>
    </ErrorWrapper>,
    document.getElementById('portal')
  )
}

export default AlertModal

const ErrorWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  height: auto;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 100;
`

const ErrorModal = styled.section`
  background-color: #f3f3f3;
  border-radius: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  height: 18em;
  justify-content: space-between;
  left: 50%;
  margin-left: -10em;
  margin-top: -9em;
  padding: 0;
  position: fixed;
  top: 50%;
  width: 20em;
`

const ErrorMessage = styled.h2`
  color: red;
  font-size: 20px;
  padding: 10px 0;
  text-align: center;
`

const InfoMessage = styled.p`
  font-size: 18px;
  padding: 0 10px;
  text-align: center;
`
const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Action = styled.button`
  all: unset;
  background-color: ${(props) =>
    props.type === 'confirm'
      ? 'var(--button-confirm)'
      : 'var(--button-cancel)'};
  border-radius: 10px;
  border: 2px solid transparent;
  box-shadow: 0 4px 8px -2px black;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: 800;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  position: relative;
  width: 100%;
`
