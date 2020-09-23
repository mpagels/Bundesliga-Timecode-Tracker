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
  sceneSelected,
}) {
  console.log(sceneSelected)
  const tags = ['Tor', 'Rote Karte']
  const history = useHistory()

  const [activeTagIndex, setActiveTagIndex] = useState(null)
  const [sceneSelect, setSceneSelect] = useState(null)
  const [description, setDescription] = useState('')
  const [timeCode, setTimeCode] = useState('')
  const [realTimeCode, setRealTimeCode] = useState('')
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
    setSceneSelect(updateCard ? sceneSelected : '')
    setDescription(updateCard ? updateCard.description : '')
    setTimeCode(updateCard ? updateCard.timeCode : '')
    setPlayerName(updateCard.playerName ? updateCard.playerName : '')
    setActiveTagIndex(
      updateCard.tag ? (updateCard.tag === 'Tor' ? 0 : 1) : null
    )
    setTimeCodeLowerThirdIn(
      updateCard.timeCodeLowerThirdIn ? updateCard.timeCodeLowerThirdIn : ''
    )
    setRealTimeCode(updateCard ? updateCard.timeCode : '')
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

  const isEmptySpecial = useIsEmptyScene(description, realTimeCode)
  const [
    hasOnlyZeros,
    lowerThirdInHasOnlyZeros,
    lowerThirdOutHasOnlyZeros,
    realTimeHasOnlyZeros,
  ] = useHasZeros(
    timeCode,
    timeCodeLowerThirdIn,
    timeCodeLowerThirdLength,
    realTimeCode
  )

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
  const isCorrectRealTimeCode = realTimeCode.length === 8

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <SceneSelectWrapper>
          <SceneType>
            <Scene htmlFor="1st">
              <input
                type="radio"
                id="1st"
                name="typeOfScene"
                value="1st"
                checked={sceneSelect === '1st'}
                onChange={handleSceneChange}
                disabled={updateCard && sceneSelect !== '1st'}
              />
              <SceneName>1st</SceneName>
            </Scene>

            <Scene htmlFor="2nd">
              <input
                type="radio"
                id="2nd"
                name="typeOfScene"
                value="2nd"
                checked={sceneSelect === '2nd'}
                onChange={handleSceneChange}
                disabled={updateCard && sceneSelect !== '2st'}
              />
              <SceneName>2nd</SceneName>
            </Scene>

            <Scene htmlFor="interview">
              <input
                type="radio"
                id="interview"
                name="typeOfScene"
                value="interview"
                checked={sceneSelect === 'interview'}
                onChange={handleSceneChange}
                disabled={updateCard && sceneSelect !== 'interview'}
              />
              <SceneName>Interview</SceneName>
            </Scene>

            <Scene htmlFor="special">
              <input
                type="radio"
                id="special"
                name="typeOfScene"
                value="special"
                checked={sceneSelect === 'special'}
                onChange={handleSceneChange}
                disabled={updateCard && sceneSelect !== 'special'}
              />
              <SceneName>Special</SceneName>
            </Scene>
          </SceneType>
          <ValidationError
            errorMessage="Wähle eine Szene aus"
            hasError={validateSceneSelect()}
          />
        </SceneSelectWrapper>
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
        {isSpecialInput() ? (
          <>
            <TimecodeInput
              title="REALTIMECODE"
              onBackSpace={preventCursorJumpToEnd}
              inputValue={formatter(realTimeCode)}
              placeholder="HH:MM:SS:FF"
              onChange={(event) =>
                handleTimeCodeChange(event, setRealTimeCode, true)
              }
            />
            <ValidationError
              errorMessage="Timecode fehlt oder ist fehlerhaft"
              hasError={validateRealTimeCode()}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        {isHalfTimeInput() && (
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
        )}
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

  function handleTimeCodeChange(
    event,
    timeCodeSetterFunc,
    isRealTimeCode = false
  ) {
    const LENGTH = isRealTimeCode ? 12 : 9

    const { value } = event.target
    const formattedTimeCode = getTimeCodeUnFormatted(value)
    value.length < LENGTH &&
      RegExp('^[0-9]*$').test(formattedTimeCode) &&
      timeCodeSetterFunc(formattedTimeCode)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function handleSceneChange(event) {
    setSceneSelect(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsDirty(true)
    const doSubmitAction = updateCard ? handleOnUpdateCard : onSaveClick

    const validationPassed =
      sceneSelect === 'interview'
        ? interviewValidationPassed
        : sceneSelect === 'special'
        ? specialValidationPassed
        : halfTimeValidationPassedWithNoEvents

    console.log('validatonFunc:', validationPassed)
    console.log(specialValidationPassed())
    const timecode = sceneSelect === 'special' ? realTimeCode : timeCode
    console.log('timecode', timecode)
    if (validationPassed()) {
      doSubmitAction(
        {
          description,
          timeCode: timecode,
          isActive: true,
        },
        sceneSelect
      )
      resetState()
      history.goBack()
    } else if (validationPassedWithEvent()) {
      doSubmitAction(
        {
          description,
          timeCode,
          tag: tags[activeTagIndex],
          timeCodeLowerThirdIn,
          timeCodeLowerThirdLength,
          playerName,
          isActive: true,
        },
        sceneSelect
      )
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
    setSceneSelect(null)
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

  function validateSceneSelect() {
    return isDirty && sceneSelect === null
  }

  function validateDescription() {
    return isDirty && isEmptyScene && !description
  }

  function validateSceneLength() {
    return isDirty && (!timeCode || hasOnlyZeros || !isCorrectTimeCode)
  }
  function validateRealTimeCode() {
    return (
      isDirty &&
      (!realTimeCode || realTimeHasOnlyZeros || !isCorrectRealTimeCode)
    )
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

  function halfTimeValidationPassedWithNoEvents() {
    return (
      !isEmptyScene &&
      !hasOnlyZeros &&
      activeTagIndex === null &&
      isCorrectTimeCode &&
      sceneSelect !== null
    )
  }
  function interviewValidationPassed() {
    return (
      !isEmptyScene &&
      activeTagIndex === null &&
      isCorrectTimeCode &&
      sceneSelect !== null
    )
  }
  function specialValidationPassed() {
    console.log(!isEmptySpecial, isCorrectRealTimeCode, sceneSelect !== null)
    return !isEmptySpecial && isCorrectRealTimeCode && sceneSelect !== null
  }

  function validationPassedWithEvent() {
    return !(
      sceneSelect === null ||
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

  function isHalfTimeInput() {
    return (
      sceneSelect === null || sceneSelect === '1st' || sceneSelect === '2nd'
    )
  }
  function isSpecialInput() {
    return sceneSelect === 'special'
  }
}

const Wrapper = styled.section`
  margin-bottom: 80px;
  padding: 0 10px 10px 10px;
  margin: 0 20px 80px;
  ${(props) => props.isEmpty && 'box-shadow: 0 0 3px 3px #cb6870;'}
`
const SceneSelectWrapper = styled.section`
  margin: 0 0 10px;
`
const SceneType = styled.div`
  display: flex;
`

const Scene = styled.label`
  align-self: center;
  cursor: pointer;
  font-size: 22px;
  width: 25%;
  margin: 0 5px 0 0;
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ span {
      background-color: #0032c8;
      color: white;
    }
  }
`
const SceneName = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'BaiJamjuree';
  font-size: 0.5em;
  width: 100%;
  padding: 5px;
  border-radius: 20px;
  border: 2px solid #0032c8;
  color: #0032c8;
`

const SceneDescription = styled.textarea`
  font-family: 'BaiJamjuree';
  font-size: 1em;
  width: 100%;
  height: 100px;
  padding: 20px;
  color: #c8c8c8;
  border-radius: 30px;
  background-color: var(--background-grey);
  border: none;
  &:focus {
    box-shadow: inset 0 0 3px 1px #e3e3e3;
    outline: black;
    color: #737373;
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
  font-family: 'BaiJamjuree';
  font-size: 1em;
  background-color: none;
  color: var(--button-delete);
`
const Save = styled(Button)`
  font-family: 'BaiJamjuree';
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
  font-family: 'BaiJamjuree';
  font-size: 0.8em;
  color: var(--font-blue);
  display: inline-block;
  margin-bottom: 5px;
`
const NameInput = styled.input`
  background-color: var(--background-grey);
  border-radius: 40px;
  border: none;
  color: #c8c8c8;
  padding: 10px 20px;
  font-family: 'BaiJamjuree';
  font-size: 1em;
  width: 100%;
  &:focus {
    box-shadow: inset 0 0 3px 1px #e3e3e3;
    outline: black;
    color: #737373;
  }
`
const LowerThirdContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
