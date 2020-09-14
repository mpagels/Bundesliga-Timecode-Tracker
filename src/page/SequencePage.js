import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SequenceCard from '../components/SequenceCard/SequenceCard'
import SequenceInput from '../components/SequenceInput/SequenceInput'
import { getTimecodeTotalLengthFromSequenceCards } from '../utils/Timecode'

export default function SequencePage() {
  const [sequenceCards, setSequenceCards] = useState([])
  const [updateCard, setUpdateCard] = useState()
  const [updateIndex, setUpdateIndex] = useState()

  useEffect(() => {
    const sequencesFromLocalStorage = JSON.parse(
      localStorage.getItem('sequences')
    )
    sequencesFromLocalStorage && setSequenceCards(sequencesFromLocalStorage)
  }, [])

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
    const sequencesFromLocalStorage = JSON.parse(
      localStorage.getItem('sequences')
    )
    if (!sequencesFromLocalStorage) {
      localStorage.setItem('sequences', JSON.stringify([sequence]))
      setSequenceCards([sequence])
    } else {
      localStorage.setItem(
        'sequences',
        JSON.stringify([...sequencesFromLocalStorage, sequence])
      )
      setSequenceCards([...sequencesFromLocalStorage, sequence])
    }
  }

  function handleToggle(index) {
    const sequencesFromLocalStorage = JSON.parse(
      localStorage.getItem('sequences')
    )

    const sequence = sequencesFromLocalStorage[index]
    sequence.isActive = !sequence.isActive

    if (!sequencesFromLocalStorage) {
      localStorage.setItem('sequences', JSON.stringify([sequence]))
      setSequenceCards([sequence])
    } else {
      const toSave = [
        ...sequencesFromLocalStorage.slice(0, index),
        sequence,
        ...sequencesFromLocalStorage.slice(index + 1),
      ]
      localStorage.setItem('sequences', JSON.stringify(toSave))
      setSequenceCards(toSave)
    }
  }

  function handleOnEdit(index) {
    const sequencesFromLocalStorage = JSON.parse(
      localStorage.getItem('sequences')
    )
    setUpdateCard(sequencesFromLocalStorage[index])
    setUpdateIndex(index)
  }

  function handleOnUpdateCard(updatedCard) {
    const sequencesFromLocalStorage = JSON.parse(
      localStorage.getItem('sequences')
    )
    if (!sequencesFromLocalStorage) {
      localStorage.setItem('sequences', JSON.stringify([updatedCard]))
      setSequenceCards([updatedCard])
    } else {
      const toSave = [
        ...sequencesFromLocalStorage.slice(0, updateIndex),
        updatedCard,
        ...sequencesFromLocalStorage.slice(updateIndex + 1),
      ]
      localStorage.setItem('sequences', JSON.stringify(toSave))
      setSequenceCards(toSave)
    }
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
