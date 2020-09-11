import React, { useState } from 'react'
import styled from 'styled-components'
import SequenceCard from '../components/SequenceCard/SequenceCard'
import SequenceInput from '../components/SequenceInput/SequenceInput'
import { getTimecodeTotalLengthFromSequenceCards } from '../utils/Timecode'

export default function SequencePage() {
  const [sequenceCards, setSequenceCards] = useState([])
  const [updateCard, setUpdateCard] = useState()
  const [updateIndex, setUpdateIndex] = useState()

  return (
    <>
      {sequenceCards.map(
        (
          {
            description,
            timeCode,
            tag,
            timeCodeLowerThirdIn,
            timeCodeLowerThirdLength,
            playerName,
            isActive,
          },
          index,
          arrayOfAllCards
        ) => (
          <SequenceCard
            description={description}
            key={index}
            index={index}
            allSequenceCards={arrayOfAllCards}
            lengthTimeCode={timeCode}
            tag={tag}
            timeCodeLowerThirdIn={timeCodeLowerThirdIn}
            timeCodeLowerThirdLength={timeCodeLowerThirdLength}
            playerName={playerName}
            isActive={isActive}
            handleToggle={handleToggle}
            handleOnEdit={() => handleOnEdit(index)}
          />
        )
      )}

      <SequenceInput
        onSaveClick={onSave}
        updateCard={updateCard}
        handleOnUpdateCard={handleOnUpdateCard}
        onUpdateCancel={onUpdateCancel}
      />

      <Footer>
        {sequenceCards.length === 0
          ? '00:00:00:00'
          : getTimecodeTotalLengthFromSequenceCards(sequenceCards)}
      </Footer>
    </>
  )

  function onSave(sequence) {
    setSequenceCards([...sequenceCards, sequence])
  }

  function handleToggle(index) {
    const sequence = sequenceCards[index]
    sequence.isActive = !sequence.isActive
    setSequenceCards([
      ...sequenceCards.slice(0, index),
      sequence,
      ...sequenceCards.slice(index + 1),
    ])
  }

  function handleOnEdit(index) {
    setUpdateCard(sequenceCards[index])
    setUpdateIndex(index)
  }

  function handleOnUpdateCard(updatedCard) {
    setSequenceCards([
      ...sequenceCards.slice(0, updateIndex),
      updatedCard,
      ...sequenceCards.slice(updateIndex + 1),
    ])
    setUpdateCard('')
  }

  function onUpdateCancel() {
    setUpdateCard('')
  }
}

const Footer = styled.footer`
  align-items: center;
  background-color: white;
  border: 1px solid var(--background-grey);
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
