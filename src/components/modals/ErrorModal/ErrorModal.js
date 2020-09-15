import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

ErrorModal.propTypes = {
  handleErrorOK: PropTypes.func.isRequired,
}

function ErrorModal({ handleErrorOK }) {
  return ReactDom.createPortal(
    <ErrorWrapper>
      <Modal>
        <ErrorTitle>Ein Fehler ist beim Laden aufgetreten!</ErrorTitle>
        <InfoMessage>
          Die App wird zurück gesetzt. Alle Daten sind verloren!
        </InfoMessage>
        <Action onClick={handleErrorOK}>OK</Action>
      </Modal>
    </ErrorWrapper>,
    document.getElementById('portal')
  )
}

export default ErrorModal

const ErrorWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  height: 100vh;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
`

const Modal = styled.section`
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

const ErrorTitle = styled.h2`
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

const Action = styled.button`
  all: unset;
  background-color: #96bd88;
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
`
