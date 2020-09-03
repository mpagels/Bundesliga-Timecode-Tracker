import React from 'react'
import styled from 'styled-components/macro'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'
import PropTypes from 'prop-types'

SequenceInput.propTypes = {
  hasDescription: PropTypes.bool,
  hasTimeCode: PropTypes.bool,
  inputValue: PropTypes.string,
  isEmpty: PropTypes.bool,
  onChange: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  setHasDescription: PropTypes.func,
}

export default function SequenceInput({
  hasDescription,
  hasTimeCode,
  inputValue,
  isEmpty,
  onChange,
  onDeleteClick,
  onSaveClick,
  setHasDescription,
  textAreaValue,
}) {
  return (
    <Wrapper isEmpty={isEmpty}>
      <form onSubmit={onSaveClick}>
        <Szenenbeschreibung
          onChange={(event) =>
            event.target.value.length > 0 && setHasDescription(true)
          }
          placeholder="Neue Szene hinzufügen"
          name="description"
          value={textAreaValue && textAreaValue}
        ></Szenenbeschreibung>
        {isEmpty && !hasDescription ? (
          <Info>Szenenbeschreibung fehlt</Info>
        ) : (
          <Info hasDescription={hasDescription}>_</Info>
        )}
        <TimecodeInput
          title="Szenenlänge"
          inputValue={inputValue}
          onChange={onChange}
        />
        {isEmpty && !hasTimeCode ? (
          <Info>Timecode fehlt oder Fehlerhaft</Info>
        ) : (
          <Info hasTimeCode={hasTimeCode}>_</Info>
        )}
        <Actions>
          <Delete onClick={onDeleteClick} type="reset">
            LÖSCHEN
          </Delete>
          <Save>SPEICHERN</Save>
        </Actions>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border-radius: 10px;
  margin-bottom: 80px;
  padding: 10px;
  background-color: #e0e0e0;
  ${(props) => props.isEmpty && 'box-shadow: 0 0 3px 3px #cb6870;'}
`

const Szenenbeschreibung = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 130%;
  background-color: #e0e0e0;
  border: none;
  box-shadow: inset 0 0 3px 1px #b8b8b8;
  &:focus {
    box-shadow: inset 0 0 3px 1px black;
    outline: black;
  }
`

const Actions = styled.div`
  display: flex;
`
const Button = styled.button`
  all: unset;
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
  width: 100%;
`

const Delete = styled(Button)`
  background-color: #cb6870;

  &:focus {
    border: 2px solid red;
  }
`
const Save = styled(Button)`
  background-color: #96bd88;
  &:focus {
    border: 2px solid green;
  }
`

const Info = styled.span`
  ${(props) =>
    props.hasDescription || props.hasTimeCode
      ? 'color: #e0e0e0'
      : 'color: #cb6870'};
  font-size: 12px;
  height: 20px;
`
