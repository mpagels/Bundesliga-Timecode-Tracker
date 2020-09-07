import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Tag from '../Tag/Tag'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'

SequenceInput.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
}

export default function SequenceInput({ onSaveClick }) {
  const tags = ['Tor', 'Rote Karte']
  const [activeTagIndex, setActiveTagIndex] = useState(null)
  const [description, setDescription] = useState('')
  const [timeCode, setTimeCode] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [timeCodeLowerThirdIn, setTimeCodeLowerThirdIn] = useState('')
  const [timeCodeLowerThirdOut, setTimeCodeLowerThirdOut] = useState('')

  const isEmptyScene = description === '' || timeCode === ''
  const isEmptyEvent =
    playerName === '' ||
    timeCodeLowerThirdIn === '' ||
    timeCodeLowerThirdOut === ''

  const isCorrectTimeCode =
    Number(timeCodeLowerThirdIn) > Number(timeCodeLowerThirdOut) &&
    Number(timeCodeLowerThirdOut) < Number(timeCodeLowerThirdIn)

  const hasOnlyZeros = new RegExp('^[0]+$').test(timeCode)
  const lowerThirdInHasOnlyZeros = new RegExp('^[0]+$').test(
    timeCodeLowerThirdIn
  )
  const lowerThirdOutHasOnlyZeros = new RegExp('^[0]+$').test(
    timeCodeLowerThirdOut
  )

  const disabled = timeCodeLowerThirdIn === ''

  return (
    <Wrapper
      isEmpty={isDirty && (isEmptyScene || (isEmptyEvent && activeTagIndex))}
    >
      <form onSubmit={handleSubmit}>
        <SceneDescription
          onChange={(event) =>
            (event.target.value.trim().length !== 0 ||
              description.length === 1) &&
            handleDescriptionChange(event)
          }
          placeholder="Neue Szene hinzufügen"
          name="description"
          value={description}
        />
        {isDirty && isEmptyScene && !description ? (
          <InfoScene hasError>Szenenbeschreibung fehlt</InfoScene>
        ) : (
          <InfoScene>&nbsp;</InfoScene>
        )}
        <TimecodeInput
          title="Szenenlänge"
          inputValue={timeCode}
          onChange={(event) => handleTimeCodeChange(event, setTimeCode)}
        />
        {isDirty && (!timeCode || hasOnlyZeros) ? (
          <InfoTimeCode hasError>Timecode fehlt oder fehlerhaft</InfoTimeCode>
        ) : (
          <InfoTimeCode>&nbsp;</InfoTimeCode>
        )}
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag
              onClick={onClickTagHandler}
              index={index}
              title={tag}
              key={tag}
              isActive={activeTagIndex === index}
            />
          ))}
        </TagContainer>
        {activeTagIndex === null || (
          <>
            <PlayerName htmlFor="playerName">Spielername:</PlayerName>
            <NameInput
              type="text"
              id="playerName"
              name="playerName"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            ></NameInput>
            {isDirty && isEmptyEvent && !playerName ? (
              <InfoScene hasError>Name fehlt</InfoScene>
            ) : (
              <InfoScene>&nbsp;</InfoScene>
            )}
            <LowerThirdContainer>
              <TimecodeInput
                style={{ margin: '10px 0' }}
                title="Timecode IN"
                inputValue={timeCodeLowerThirdIn}
                onChange={(event) =>
                  handleTimeCodeChange(event, setTimeCodeLowerThirdIn)
                }
              />
              {isDirty &&
              (!timeCodeLowerThirdIn ||
                lowerThirdInHasOnlyZeros ||
                isCorrectTimeCode) ? (
                <InfoTimeCode hasError>
                  Timecode fehlt oder fehlerhaft
                </InfoTimeCode>
              ) : (
                <InfoTimeCode>&nbsp;</InfoTimeCode>
              )}
              <TimecodeInput
                style={{ margin: '10px 0' }}
                disabled={disabled}
                title="Timecode OUT"
                inputValue={timeCodeLowerThirdOut}
                onChange={(event) =>
                  handleTimeCodeChange(event, setTimeCodeLowerThirdOut)
                }
              />
              {isDirty &&
              (!timeCodeLowerThirdOut ||
                lowerThirdOutHasOnlyZeros ||
                isCorrectTimeCode) ? (
                <InfoTimeCode hasError>
                  Timecode fehlt oder fehlerhaft
                </InfoTimeCode>
              ) : (
                <InfoTimeCode>&nbsp;</InfoTimeCode>
              )}
            </LowerThirdContainer>
          </>
        )}
        <Actions>
          <Delete onClick={onDeleteClick} type="reset">
            ABBRECHEN
          </Delete>
          <Save>SPEICHERN</Save>
        </Actions>
      </form>
    </Wrapper>
  )

  function handleTimeCodeChange(event, timeCodeSetterFunc) {
    const { value } = event.target
    value.length < 9 &&
      RegExp('^[0-9]*$').test(value) &&
      timeCodeSetterFunc(value)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsDirty(true)

    if (!isEmptyScene && !hasOnlyZeros && activeTagIndex === null) {
      setIsDirty(false)
      onSaveClick({
        description,
        timeCode,
      })
      setDescription('')
      setTimeCode('')
      setActiveTagIndex(null)
    } else if (
      !isEmptyScene &&
      !isEmptyEvent &&
      !hasOnlyZeros &&
      !lowerThirdInHasOnlyZeros &&
      !lowerThirdOutHasOnlyZeros &&
      !isCorrectTimeCode
    ) {
      onSaveClick({
        description,
        timeCode,
        tag: tags[activeTagIndex],
        timeCodeLowerThirdIn,
        timeCodeLowerThirdOut,
        playerName,
      })
      resetState()
    }
  }

  function onClickTagHandler(index) {
    setActiveTagIndex(activeTagIndex === index ? null : index)
    setIsDirty(false)
  }

  function onDeleteClick(event) {
    event.preventDefault()
    resetState()
  }

  function resetState() {
    setIsDirty(false)
    setDescription('')
    setTimeCode('')
    setActiveTagIndex(null)
    setPlayerName('')
    setTimeCodeLowerThirdIn('')
    setTimeCodeLowerThirdOut('')
  }
}

const Wrapper = styled.section`
  border-radius: 10px;
  margin-bottom: 80px;
  padding: 10px;
  background-color: var(--background-grey);
  ${(props) => props.isEmpty && 'box-shadow: 0 0 3px 3px #cb6870;'}
`
const SceneDescription = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 130%;
  background-color: var(----background-grey);
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
const InfoScene = styled.span`
  color: ${(props) =>
    props.hasError ? '#cb6870' : 'var(----background-grey)'};
  font-size: 12px;
`
const InfoTimeCode = styled(InfoScene)`
  color: ${(props) =>
    props.hasError ? '#cb6870' : 'var(----background-grey)'};
  font-size: 12px;
`
const TagContainer = styled.div`
  display: flex;
  margin: 10px 10px 30px 0;
`
const PlayerName = styled.label`
  display: inline-block;
  margin-bottom: 2px;
  color: #737373;
  font-size: 18px;
  font-size: 150%;
`
const NameInput = styled.input`
  padding: 20px;
  border: 0;
  width: 100%;
  font-size: 18px;
  box-shadow: inset 0 0 3px 1px #b8b8b8;
  background-color: var(----background-grey);
  &:focus {
    box-shadow: inset 0 0 3px 1px black;
    outline: black;
  }
  font-size: 150%;
  padding: 15px;
`
const LowerThirdContainer = styled.div`
  display: flex;
  flex-direction: column;
`
