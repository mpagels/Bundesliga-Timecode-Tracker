import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'
import ValidationError from '../SequenceInput/ValidationError'
import { formatter } from '../../utils/timeCodeFormatter'
import preventCursorJumpToEnd from '../../utils/preventCursorJumpToEnd'
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../../utils/localStorage'

export default function Settings({ onClick, handleSummerySave }) {
  const [targetLength, setTargetLength] = useState('')
  const [hasError, setHasError] = useState(false)
  const history = useHistory()
  const isActive = targetLength.length > 0

  useEffect(() => {
    const targetLength = loadFromLocalStorage('targetLength')
    targetLength && setTargetLength(targetLength)
  }, [])

  return (
    <PageWrapper>
      <TimecodeInput
        title="SPIELBERICHT LÄNGE"
        onBackSpace={preventCursorJumpToEnd}
        inputValue={formatter(targetLength)}
        placeholder="MM:SS"
        onChange={(event) => handleTimeCodeChange(event, setTargetLength)}
      />
      <ValidationError errorMessage="Timecode fehlerhaft" hasError={hasError} />
      <ActionWrapper>
        <SaveSettingsAction isActive={isActive} onClick={handleSave}>
          <span>SPEICHERN</span>
        </SaveSettingsAction>
        <DeleteAction onClick={onClick}>
          <span>SPIELTAG LÖSCHEN</span>
        </DeleteAction>
      </ActionWrapper>
    </PageWrapper>
  )

  function validatetargetLength() {
    return targetLength.length % 2 !== 0 && targetLength !== ''
  }

  function handleTimeCodeChange(event, timeCodeSetterFunc) {
    setHasError(false)
    const LENGTH = 6

    const { value } = event.target
    const formattedTimeCode = getTimeCodeUnFormatted(value)
    value.length < LENGTH &&
      RegExp('^[0-9]*$').test(formattedTimeCode) &&
      timeCodeSetterFunc(formattedTimeCode)
  }

  function getTimeCodeUnFormatted(timeCode) {
    return timeCode.split(':').join('')
  }

  function handleSave() {
    if (targetLength.length === 4) {
      handleSummerySave(targetLength)
      saveToLocalStorage('targetLength', targetLength)
      history.push('/')
    } else if (validatetargetLength()) {
      setHasError(true)
    }
  }
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
`

const ActionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 360px;
`

const DeleteAction = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: var(--button-delete);
  padding: 20px;
  border: 3px solid var(--button-delete);
  border-radius: 50px;
  & span {
    font-weight: 400;
    font-size: 1.4em;
  }
`

const SaveSettingsAction = styled(DeleteAction)`
  margin-top: 30px;
  background-color: ${(props) =>
    props.isActive ? 'var(--button-confirm)' : 'var(--solid-grey)'};
  border: none;
  color: white;
`
