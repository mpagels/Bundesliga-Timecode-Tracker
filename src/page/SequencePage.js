import React, { useState } from 'react'
import styled from 'styled-components'
import {
  getFormatedTimecode,
  getTimecodeTotalLengthFromSequenceCards,
} from '../utils/Timecode'
import SequenceInput from '../components/SequenceInput/SequenceInput'
import SequenceCard from '../components/SequenceCard/SequenceCard'

export default function SequencePage() {
  const [sequenceCards, setSequenceCards] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [hasDescription, setHasDescription] = useState(true)
  const [hasTimeCode, setHasTimeCode] = useState(true)

  return (
    <>
      {sequenceCards.map(({ description, timeCode }, index) => (
        <SequenceCard
          key={index}
          description={description}
          lengthTimeCode={getFormatedTimecode(timeCode)}
        />
      ))}

      <SequenceInput
        onSaveClick={onSave}
        onDeleteClick={onDelete}
        isEmpty={isEmpty}
        hasDescription={hasDescription}
        hasTimeCode={hasTimeCode}
        onKeyDown={onKeyDown}
      />

      <Footer>
        {sequenceCards.length === 0
          ? '00:00:00:00'
          : getTimecodeTotalLengthFromSequenceCards(sequenceCards)}
      </Footer>
    </>
  )

  function onSave(event) {
    event.preventDefault()
    const form = event.target
    const description = form[0].value
    const timeCode = form[1].value
    if (!description && !timeCode) {
      setIsEmpty(true)
      setHasDescription(false)
      setHasTimeCode(false)
    } else if (!description) {
      setIsEmpty(true)
      setHasDescription(false)
    } else if (!timeCode) {
      setIsEmpty(true)
      setHasTimeCode(false)
    } else {
      setIsEmpty(false)
      setHasTimeCode(true)
      setSequenceCards([...sequenceCards, { description, timeCode }])
      form.reset()
    }
  }

  function onDelete(event) {
    setIsEmpty(false)
    setHasDescription(true)
    setHasTimeCode(true)
  }

  function onKeyDown(event) {
    if (
      !(
        (event.keyCode > 95 && event.keyCode < 106) ||
        (event.keyCode > 47 && event.keyCode < 58) ||
        event.key === 'Backspace' ||
        event.keyCode === 9
      )
    ) {
      setHasTimeCode(false)
      setIsEmpty(true)
    } else {
      setHasTimeCode(true)
      setHasDescription(true)
      setIsEmpty()
    }
  }
}

const Footer = styled.footer`
  align-items: center;
  background-color: white;
  border: 1px solid #e0e0e0;
  bottom: 0;
  display: flex;
  font-size: 32px;
  font-weight: 800;
  height: 70px;
  justify-content: center;
  left: 0;
  margin: 0;
  position: fixed;
  text-align: center;
  width: 100%;
`
