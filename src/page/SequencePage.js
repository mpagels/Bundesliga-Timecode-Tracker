import React, { useState } from 'react'
import styled from 'styled-components'
import SequenceCard from '../components/SequenceCard/SequenceCard'
import SequenceInput from '../components/SequenceInput/SequenceInput'
import { getTimecodeTotalLengthFromSequenceCards } from '../utils/Timecode'

export default function SequencePage() {
  const [sequenceCards, setSequenceCards] = useState([])
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
          />
        )
      )}

      <SequenceInput onSaveClick={onSave} />

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
