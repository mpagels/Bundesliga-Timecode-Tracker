import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Tag from '../Tag/Tag'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'
import { formatter } from '../../utils/timeCodeFormatter'
import useIsEmptyScene from './hooks/useIsEmptyScene'

SequenceInput.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
}

export default function SequenceInput({
  onSaveClick,
  updateCard = '',
  handleOnUpdateCard,
  onUpdateCancel,
}) {
  const tags = ['Tor', 'Rote Karte']

  const [activeTagIndex, setActiveTagIndex] = useState(null)
  const [description, setDescription] = useState('')
  const [timeCode, setTimeCode] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [timeCodeLowerThirdIn, setTimeCodeLowerThirdIn] = useState('')
  const [timeCodeLowerThirdLength, setTimeCodeLowerThirdLength] = useState('')

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

  const {
    isEmptyEvent,
    isCorrectTimeCode,
    hasOnlyZeros,
    lowerThirdInHasOnlyZeros,
    lowerThirdOutHasOnlyZeros,
    isCorrectLowerThirdIn,
    isCorrectLowerThirdLength,
    disabled,
    hasCorrectLowerThirdLength,
  } = getAllChecks(
    description,
    timeCode,
    playerName,
    timeCodeLowerThirdIn,
    timeCodeLowerThirdLength
  )

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
        />
        {isDirty && isEmptyScene && !description ? (
          <InfoScene hasError>Szenenbeschreibung fehlt</InfoScene>
        ) : (
          <InfoScene>&nbsp;</InfoScene>
        )}
        <TimecodeInput
          title="Szenenlänge"
          handleBackSpace={handleBackSpace}
          inputValue={formatter(timeCode)}
          onChange={(event) => handleTimeCodeChange(event, setTimeCode)}
        />
        {isDirty && (!timeCode || hasOnlyZeros || !isCorrectTimeCode) ? (
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
            <StyledLabel htmlFor="playerName">Spielername:</StyledLabel>
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
                handleBackSpace={handleBackSpace}
                title="Bauchbinde IN (relativ zur Szene)"
                inputValue={formatter(timeCodeLowerThirdIn)}
                onChange={(event) =>
                  handleTimeCodeChange(event, setTimeCodeLowerThirdIn)
                }
              />
              {isDirty &&
              (!timeCodeLowerThirdIn ||
                lowerThirdInHasOnlyZeros ||
                !isCorrectLowerThirdIn ||
                !hasCorrectLowerThirdLength) ? (
                <InfoTimeCode hasError>
                  Timecode fehlt, ist fehlerhaft oder ist insgesamt zu lang!
                </InfoTimeCode>
              ) : (
                <InfoTimeCode>&nbsp;</InfoTimeCode>
              )}
              <TimecodeInput
                style={{ margin: '10px 0' }}
                disabled={disabled}
                handleBackSpace={handleBackSpace}
                title="Bauchbinde Länge"
                placeholder="SS:FF"
                inputValue={formatter(timeCodeLowerThirdLength)}
                onChange={(event) =>
                  handleTimeCodeChange(event, setTimeCodeLowerThirdLength)
                }
              />
              {isDirty &&
              (!timeCodeLowerThirdLength ||
                lowerThirdOutHasOnlyZeros ||
                !isCorrectLowerThirdLength ||
                !hasCorrectLowerThirdLength) ? (
                <InfoTimeCode hasError>
                  Timecode fehlt, ist fehlerhaft oder ist insgesamt zu lang!
                </InfoTimeCode>
              ) : (
                <InfoTimeCode>&nbsp;</InfoTimeCode>
              )}
            </LowerThirdContainer>
          </>
        )}
        <Actions>
          <Delete onClick={onCancelClick} type="reset">
            ABBRECHEN
          </Delete>
          {updateCard ? <Save>AKTUALISIEREN</Save> : <Save>SPEICHERN</Save>}
        </Actions>
      </form>
    </Wrapper>
  )

  function handleBackSpace(event) {
    if (event.key === 'Backspace' || event.key === 'Process') {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        const caret = event.target.selectionStart
        const element = event.target
        window.requestAnimationFrame(() => {
          element.selectionStart = caret
          element.selectionEnd = caret
        })
      } else {
        const caret = event.target.selectionStart
        const element = event.target
        window.requestAnimationFrame(() => {
          element.selectionStart = caret - 1
          element.selectionEnd = caret - 1
        })
      }
    }
  }

  function handleTimeCodeChange(event, timeCodeSetterFunc) {
    const { value } = event.target

    const formattedTimecCode = getTimeCodeUnFormatted(value)
    value.length < 9 &&
      RegExp('^[0-9]*$').test(formattedTimecCode) &&
      timeCodeSetterFunc(formattedTimecCode)
  }

  function getTimeCodeUnFormatted(timeCode) {
    return timeCode.split(':').join('')
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsDirty(true)
    if (!updateCard) {
      if (
        !isEmptyScene &&
        !hasOnlyZeros &&
        activeTagIndex === null &&
        isCorrectTimeCode
      ) {
        setIsDirty(false)
        onSaveClick({
          description,
          timeCode,
          isActive: true,
        })
        setDescription('')
        setTimeCode('')
        setActiveTagIndex(null)
      } else if (
        !(
          isEmptyScene ||
          isEmptyEvent ||
          hasOnlyZeros ||
          lowerThirdInHasOnlyZeros ||
          lowerThirdOutHasOnlyZeros ||
          !isCorrectLowerThirdIn ||
          !isCorrectLowerThirdLength ||
          !checkCorrectTimeCode()
        )
      ) {
        onSaveClick({
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
    } else {
      if (
        !isEmptyScene &&
        !hasOnlyZeros &&
        activeTagIndex === null &&
        isCorrectTimeCode
      ) {
        setIsDirty(false)
        handleOnUpdateCard({
          description,
          timeCode,
          isActive: updateCard.isActive,
        })
        setDescription('')
        setTimeCode('')
        setActiveTagIndex(null)
      } else if (
        !(
          isEmptyScene ||
          isEmptyEvent ||
          hasOnlyZeros ||
          lowerThirdInHasOnlyZeros ||
          lowerThirdOutHasOnlyZeros ||
          !isCorrectLowerThirdIn ||
          !isCorrectLowerThirdLength ||
          !checkCorrectTimeCode()
        )
      ) {
        handleOnUpdateCard({
          description,
          timeCode,
          tag: tags[activeTagIndex],
          timeCodeLowerThirdIn,
          timeCodeLowerThirdLength,
          playerName,
          isActive: updateCard.isActive,
        })
        resetState()
      }
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

  function getAllChecks(
    description,
    timeCode,
    playerName,
    timeCodeLowerThirdIn,
    timeCodeLowerThirdLength
  ) {
    const isEmptyScene = description === '' || timeCode === ''
    const isEmptyEvent =
      playerName === '' ||
      timeCodeLowerThirdIn === '' ||
      timeCodeLowerThirdLength === ''

    const isCorrectTimeCode = timeCode.length % 2 === 0

    const hasOnlyZeros = new RegExp('^[0]+$').test(timeCode)
    const lowerThirdInHasOnlyZeros = new RegExp('^[0]+$').test(
      timeCodeLowerThirdIn
    )
    const lowerThirdOutHasOnlyZeros = new RegExp('^[0]+$').test(
      timeCodeLowerThirdLength
    )

    const isCorrectLowerThirdIn =
      timeCodeLowerThirdIn.length % 2 === 0 && timeCodeLowerThirdIn !== ''
    const isCorrectLowerThirdLength =
      timeCodeLowerThirdLength.length % 2 === 0 &&
      timeCodeLowerThirdLength !== ''

    const disabled = timeCodeLowerThirdIn === ''

    const hasCorrectLowerThirdLength = checkCorrectTimeCode()

    return {
      isEmptyScene,
      isEmptyEvent,
      isCorrectTimeCode,
      hasOnlyZeros,
      lowerThirdInHasOnlyZeros,
      lowerThirdOutHasOnlyZeros,
      isCorrectLowerThirdIn,
      isCorrectLowerThirdLength,
      disabled,
      hasCorrectLowerThirdLength,
    }
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
