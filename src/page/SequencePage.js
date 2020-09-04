import React, { useState } from 'react'
import styled from 'styled-components'
import SequenceCard from '../components/SequenceCard/SequenceCard'
import SequenceInput from '../components/SequenceInput/SequenceInput'
import {
  getFormatedTimecode,
  getTimecodeTotalLengthFromSequenceCards,
} from '../utils/Timecode'

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
            timeCodeLowerThirdOut,
            playerName,
          },
          index
        ) => (
          <SequenceCard
            description={description}
            key={index}
            lengthTimeCode={getFormatedTimecode(timeCode)}
            tag={tag}
            timeCodeLowerThirdIn={getFormatedTimecode(timeCodeLowerThirdIn)}
            timeCodeLowerThirdOut={getFormatedTimecode(timeCodeLowerThirdOut)}
            playerName={playerName}
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
}

const Footer = styled.footer`
  align-items: center;
  background-color: white;
  border: 1px solid var(----background-grey);
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
