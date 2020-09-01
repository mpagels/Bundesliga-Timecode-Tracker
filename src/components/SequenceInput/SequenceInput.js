import React from 'react'
import styled from 'styled-components/macro'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'

export default function SequenceInput({
  onSaveClick,
  isEmpty,
  hasDescription,
  hasTimeCode,
  onDeleteClick,
  onKeyDown,
}) {
  return (
    <Wrapper isEmpty={isEmpty}>
      <form onSubmit={onSaveClick}>
        <Szenenbeschreibung
          placeholder="Neue Szene hinzufügen"
          name="description"
        ></Szenenbeschreibung>
        {isEmpty && !hasDescription ? (
          <Info>Szenenbeschreibung fehlt</Info>
        ) : (
          <Info hasDescription={hasDescription}>_</Info>
        )}
        <TimecodeInput title="Szenenlänge" onKeyDown={onKeyDown} />
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
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  width: 100%;
  color: white;
  box-shadow: 0 4px 8px -2px black;
  display: flex;
  justify-content: center;
  border: 2px solid transparent;
`

const Delete = styled(Button)`
  background-color: #cb6870;

  &:focus {
    border: 2px solid red;
  }
`
const Save = styled(Button)`
  background-color: #96bd88;
  &:hover {
    border: 2px solid green;
  }
  &:focus {
    border: 2px solid green;
  }
`

const Info = styled.span`
  font-size: 12px;
  color: #cb6870;
  ${(props) => (props.hasDescription || props.hasTimeCode) && 'color: #e0e0e0'};
  height: 20px;
`
