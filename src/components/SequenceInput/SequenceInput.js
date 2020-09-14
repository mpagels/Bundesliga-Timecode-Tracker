import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import Tag from '../Tag/Tag'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'
import { formatter } from '../../utils/timeCodeFormatter'
import preventCursorJumpToEnd from '../../utils/preventCursorJumpToEnd'
import useIsEmptyScene from './hooks/useIsEmptyScene'
import useIsEmptyEvent from './hooks/useIsEmptyEvent'
import useHasZeros from './hooks/useHasZeros'
import useCheckLowerThirds from './hooks/useCheckLowerThirds'
import ValidationError from './ValidationError'

SequenceInput.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  updateCard: PropTypes.string,
  handleOnUpdateCard: PropTypes.func,
  onUpdateCancel: PropTypes.func,
  isEmpty: PropTypes.bool.isRequired,
  isAlert: PropTypes.bool,
}

export default function SequenceInput({
  onSaveClick,
  updateCard = '',
  handleOnUpdateCard,
  onUpdateCancel,
  isEmpty,
  isAlert,
}) {
  const tags = ['Tor', 'Rote Karte']

  const [activeTagIndex, setActiveTagIndex] = useState(null)
  const [description, setDescription] = useState('')
  const [timeCode, setTimeCode] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [timeCodeLowerThirdIn, setTimeCodeLowerThirdIn] = useState('')
  const [timeCodeLowerThirdLength, setTimeCodeLowerThirdLength] = useState('')
  const inputOnUpdate = useRef(null)

  useEffect(() => {
    isEmpty && resetState()
  }, [isEmpty, isAlert])

  useEffect(() => {
    setDescription(updateCard ? updateCard.description : '')
    setTimeCode(updateCard ? updateCard.timeCode : '')
    setPlayerName(updateCard.playerName ? updateCard.playerName : '')
    setActiveTagIndex(
      updateCard.tag ? (updateCard.tag === 'Tor' ? 0 : 1) : null
    )
    setTimeCodeLowerThirdIn(
      updateCard.timeCodeLowerThirdIn ? updateCard.timeCodeLowerThirdIn : ''
    )
    setTimeCodeLowerThirdLength(
      updateCard.timeCodeLowerThirdLength
        ? updateCard.timeCodeLowerThirdLength
        : ''
    )
  }, [updateCard])

  updateCard && inputOnUpdate.current.focus()

  const isEmptyScene = useIsEmptyScene(description, timeCode)
  const isEmptyEvent = useIsEmptyEvent(
    playerName,
    timeCodeLowerThirdIn,
    timeCodeLowerThirdLength
  )
  const [
    hasOnlyZeros,
    lowerThirdInHasOnlyZeros,
    lowerThirdOutHasOnlyZeros,
  ] = useHasZeros(timeCode, timeCodeLowerThirdIn, timeCodeLowerThirdLength)

  const [
    isCorrectLowerThirdIn,
    isCorrectLowerThirdLength,
    disabled,
    hasCorrectLowerThirdLength,
  ] = useCheckLowerThirds(
    timeCodeLowerThirdIn,
    timeCodeLowerThirdLength,
    timeCode
  )

  const isCorrectTimeCode = timeCode.length % 2 === 0

  return (
    <Wrapper
      isEmpty={isDirty && (isEmptyScene || (isEmptyEvent && activeTagIndex))}
    >
      <form onSubmit={handleSubmit}>
        <StyledLabel htmlFor="description">
          {updateCard ? 'Szene bearbeiten' : 'Neue Szene hinzufügen'}
        </StyledLabel>
        <SceneDescription
          onChange={(event) =>
            (event.target.value.trim().length !== 0 ||
              description.length === 1) &&
            handleDescriptionChange(event)
          }
          placeholder="Lewandowski köpft auf Tor..."
          name="description"
          id="description"
          value={description}
          ref={inputOnUpdate}
        />
        <ValidationError
          errorMessage="Szenenbeschreibung fehlt"
          hasError={validateDescription()}
        />
        <TimecodeInput
          title="Szenenlänge"
          onBackSpace={preventCursorJumpToEnd}
          inputValue={formatter(timeCode)}
          onChange={(event) => handleTimeCodeChange(event, setTimeCode)}
        />
        <ValidationError
          errorMessage="Timecode fehlt oder ist fehlerhaft"
          hasError={validateSceneLength()}
        />
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
            <StyledLabel htmlFor="playerName">Spielername:</StyledLabel>
            <NameInput
              type="text"
              id="playerName"
              name="playerName"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            ></NameInput>
            <ValidationError
              errorMessage="Name fehlt"
              hasError={isDirty && isEmptyEvent && !playerName}
            />
            <LowerThirdContainer>
              <TimecodeInput
                style={{ margin: '10px 0' }}
                onBackSpace={preventCursorJumpToEnd}
                title="Bauchbinde IN (relativ zur Szene)"
                inputValue={formatter(timeCodeLowerThirdIn)}
                onChange={(event) =>
                  handleTimeCodeChange(event, setTimeCodeLowerThirdIn)
                }
              />
              <ValidationError
                errorMessage="Timecode fehlt, ist fehlerhaft oder ist insgesamt zu lang!"
                hasError={validateLowerThirdIn()}
              />
              <TimecodeInput
                style={{ margin: '10px 0' }}
                disabled={disabled}
                onBackSpace={preventCursorJumpToEnd}
                title="Bauchbinde Länge"
                placeholder="SS:FF"
                inputValue={formatter(timeCodeLowerThirdLength)}
                onChange={(event) =>
                  handleTimeCodeChange(event, setTimeCodeLowerThirdLength)
                }
              />
              <ValidationError
                errorMessage="Timecode fehlt, ist fehlerhaft oder ist insgesamt zu lang!"
                hasError={validateLowerThirdLength()}
              />
            </LowerThirdContainer>
          </>
        )}
        <Actions>
          <Delete onClick={onCancelClick} type="reset">
            ABBRECHEN
          </Delete>
          {updateCard ? (
            <Save save={true}>AKTUALISIEREN</Save>
          ) : (
            <Save>SPEICHERN</Save>
          )}
        </Actions>
      </form>
    </Wrapper>
  )

  function handleTimeCodeChange(event, timeCodeSetterFunc) {
    const { value } = event.target
    const formattedTimeCode = getTimeCodeUnFormatted(value)
    value.length < 9 &&
      RegExp('^[0-9]*$').test(formattedTimeCode) &&
      timeCodeSetterFunc(formattedTimeCode)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsDirty(true)
    const doSubmitAction = updateCard ? handleOnUpdateCard : onSaveClick

    if (validationPassedWithNoEvent()) {
      doSubmitAction({
        description,
        timeCode,
        isActive: true,
      })
      resetState()
    } else if (validationPassedWithEvent()) {
      doSubmitAction({
        description,
        timeCode,
        tag: tags[activeTagIndex],
        timeCodeLowerThirdIn,
        timeCodeLowerThirdLength,
        playerName,
        isActive: true,
      })
      resetState()
    }
  }

  function onClickTagHandler(index) {
    setActiveTagIndex(activeTagIndex === index ? null : index)
    setIsDirty(false)
  }

  function onCancelClick(event) {
    event.preventDefault()
    resetState()
    updateCard && onUpdateCancel()
  }

  function resetState() {
    setIsDirty(false)
    setDescription('')
    setTimeCode('')
    setActiveTagIndex(null)
    setPlayerName('')
    setTimeCodeLowerThirdIn('')
    setTimeCodeLowerThirdLength('')
  }

  function checkCorrectTimeCode() {
    return (
      Number(timeCodeLowerThirdIn) + Number(timeCodeLowerThirdLength) <=
      timeCode
    )
  }

  function getTimeCodeUnFormatted(timeCode) {
    return timeCode.split(':').join('')
  }

  function validateDescription() {
    return isDirty && isEmptyScene && !description
  }

  function validateSceneLength() {
    return isDirty && (!timeCode || hasOnlyZeros || !isCorrectTimeCode)
  }

  function validateLowerThirdIn() {
    return (
      isDirty &&
      (!timeCodeLowerThirdIn ||
        lowerThirdInHasOnlyZeros ||
        !isCorrectLowerThirdIn ||
        !hasCorrectLowerThirdLength)
    )
  }

  function validateLowerThirdLength() {
    return (
      isDirty &&
      (!timeCodeLowerThirdLength ||
        lowerThirdOutHasOnlyZeros ||
        !isCorrectLowerThirdLength ||
        !hasCorrectLowerThirdLength)
    )
  }

  function validationPassedWithNoEvent() {
    return (
      !isEmptyScene &&
      !hasOnlyZeros &&
      activeTagIndex === null &&
      isCorrectTimeCode
    )
  }

  function validationPassedWithEvent() {
    return !(
      isEmptyScene ||
      isEmptyEvent ||
      hasOnlyZeros ||
      lowerThirdInHasOnlyZeros ||
      lowerThirdOutHasOnlyZeros ||
      !isCorrectLowerThirdIn ||
      !isCorrectLowerThirdLength ||
      !checkCorrectTimeCode()
    )
  }
}

const Wrapper = styled.section`
  border-radius: 10px;
  margin-bottom: 80px;
  padding: 10px;
  margin: 0 20px 80px;
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
  font-size: ${(props) => props.save && '16px;'};
  &:focus {
    border: 2px solid green;
  }
`
const TagContainer = styled.div`
  display: flex;
  margin: 10px 10px 30px 0;
`
const StyledLabel = styled.label`
  display: inline-block;
  margin-bottom: 2px;
  color: #737373;
  font-size: 18px;
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
