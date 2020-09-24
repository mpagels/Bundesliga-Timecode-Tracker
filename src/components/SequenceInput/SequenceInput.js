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
import { useHistory } from 'react-router-dom'

SequenceInput.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  updateCard: PropTypes.string,
  handleOnUpdateCard: PropTypes.func,
  onUpdateCancel: PropTypes.func,
  isEmpty: PropTypes.bool.isRequired,
}

export default function SequenceInput({
  onSaveClick,
  updateCard = '',
  handleOnUpdateCard,
  onUpdateCancel,
  isEmpty,
}) {
  const tags = ['Tor', 'Rote Karte']
  const history = useHistory()

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
  }, [isEmpty])

  useEffect(() => {
    updateCard && inputOnUpdate.current.focus()
    return () => {
      onUpdateCancel()
    }
  }, [updateCard])

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
    <Wrapper>
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
          placeholder="Szenenbeschreibung..."
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
          title="SZENENLÄNGE"
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
            <StyledLabel htmlFor="playerName">SPIELERNAME</StyledLabel>
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
                title="BAUCHBINDE IN (relativ zur Szene)"
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
                title="BAUCHBINDE LÄNGE"
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
          {updateCard ? (
            <Save save={true}>AKTUALISIEREN</Save>
          ) : (
            <Save>SPEICHERN</Save>
          )}
          <Delete onClick={onCancelClick} type="reset">
            LÖSCHEN
          </Delete>
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
      history.goBack()
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
      history.goBack()
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
  margin-bottom: 80px;
  padding: 10px;
  margin: 0 20px 80px;
  ${(props) => props.isEmpty && 'box-shadow: 0 0 3px 3px var(--error-redish);'}
`
const SceneDescription = styled.textarea`
  font-size: 1em;
  width: 100%;
  height: 100px;
  padding: 20px;
  color: var(--solid-grey);
  border-radius: 30px;
  background-color: var(--background-grey);
  border: none;
  &:focus {
    box-shadow: inset 0 0 3px 1px var(--tag-border-grey);
    outline: black;
    color: var(--dark-grey);
  }
`
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Button = styled.button`
  all: unset;
  border-radius: 10px;
  border: 2px solid transparent;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
`
const Delete = styled(Button)`
  font-size: 0.7em;
  background-color: none;
  color: var(--button-delete);
`
const Save = styled(Button)`
  font-size: 1.3em;
  width: 175px;
  border-radius: 30px;
  background-color: var(--button-confirm);
`
const TagContainer = styled.div`
  display: flex;
  margin: 10px 10px 30px 0;
`
const StyledLabel = styled.label`
  font-size: 0.8em;
  color: var(--font-blue);
  display: inline-block;
  margin-bottom: 5px;
  font-weight: 700;
`
const NameInput = styled.input`
  background-color: var(--background-grey);
  border-radius: 40px;
  border: none;
  color: var(--solid-grey);
  padding: 10px 20px;

  font-size: 1em;
  width: 100%;
  &:focus {
    box-shadow: inset 0 0 3px 1px var(--tag-border-grey);
    outline: black;
    color: var(--dark-grey);
  }
`
const LowerThirdContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
