import React, { useState, useEffect } from 'react'
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
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    hasDescription && hasTimeCode && setIsEmpty(false)
  }, [hasDescription, hasTimeCode])

  return (
    <>
      {sequenceCards.map(({ description, timeCode }, index) => (
        <SequenceCard
          description={description}
          key={index}
          lengthTimeCode={getFormatedTimecode(timeCode)}
        />
      ))}

      <SequenceInput
        hasDescription={hasDescription}
        hasTimeCode={hasTimeCode}
        inputValue={inputValue}
        isEmpty={isEmpty}
        onChange={handleInputOnChange}
        onDeleteClick={onDelete}
        onSaveClick={onSave}
        setHasDescription={setHasDescription}
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

    const hasOnlyZeros = new RegExp('^[0]+$').test(timeCode)

    if (!description?.trim() && !timeCode) {
      setHasDescription(false)
      setHasTimeCode(false)
      setIsEmpty(true)
    } else if (!description || !description?.trim()) {
      setHasDescription(false)
      setIsEmpty(true)
    } else if (!timeCode || hasOnlyZeros) {
      setHasTimeCode(false)
      setIsEmpty(true)
    } else {
      setHasTimeCode(true)
      setInputValue('')
      setIsEmpty(false)
      setSequenceCards([...sequenceCards, { description, timeCode }])
      form[0].focus()
      form.reset()
    }
  }

  function onDelete() {
    setHasDescription(true)
    setHasTimeCode(true)
    setInputValue('')
    setIsEmpty(false)
  }

  function handleInputOnChange(event) {
    const value = event.target.value
    const regex = new RegExp('^[0-9]*$')
    if (regex.test(value) && value.length < 9) {
      setHasTimeCode(true)
      setInputValue(value)
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
