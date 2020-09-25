import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import TimecodeInput from '../TimecodeTracker/TimecodeInput'
import ValidationError from '../SequenceInput/ValidationError'
import { formatter } from '../../utils/timeCodeFormatter'
import preventCursorJumpToEnd from '../../utils/preventCursorJumpToEnd'
import { saveToLocalStorage } from '../../utils/localStorage'

export default function Settings({ onClick, handleSummerySave }) {
  const [summaryLength, setSummaryLength] = useState('')
  const [hasError, setHasError] = useState(false)
  const history = useHistory()
  const isActive = summaryLength.length > 0
  return (
    <PageWrapper>
      <TimecodeInput
        title="SPIELBERICHT LÄNGE"
        onBackSpace={preventCursorJumpToEnd}
        inputValue={formatter(summaryLength)}
        placeholder="MM:SS"
        onChange={(event) => handleTimeCodeChange(event, setSummaryLength)}
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

  function validateSummaryLength() {
    return summaryLength.length % 2 !== 0 && summaryLength !== ''
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
    if (summaryLength.length === 4) {
      handleSummerySave(summaryLength)
      saveToLocalStorage('summaryLength', summaryLength)
      history.push('/')
    } else if (validateSummaryLength()) {
      console.log('drin')
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
