import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SequenceCard from '../components/SequenceCard/SequenceCard'
import SequenceInput from '../components/SequenceInput/SequenceInput'
import { getTimecodeTotalLengthFromSequenceCards } from '../utils/Timecode'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  deleteFromLocalStorage,
} from '../utils/localStorage'
import { ReactComponent as DeleteButton } from '../assets/delete-data.svg'
import ErrorModal from '../components/modals/ErrorModal/ErrorModal'
import AlertModal from '../components/modals/AlertModal/AlertModal'

export default function SequencePage() {
  const [sequenceCards, setSequenceCards] = useState([])
  const [updateCard, setUpdateCard] = useState()
  const [updateIndex, setUpdateIndex] = useState()
  const [isError, setIsError] = useState()
  const [isAlert, setIsAlert] = useState()

  useEffect(() => {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
    sequencesFromLocalStorage && setSequenceCards(sequencesFromLocalStorage)
  }, [])

  document.body.style.overflowY = isError || isAlert ? 'hidden' : 'unset'

  const isEmpty = sequenceCards.length === 0
  return (
    <>
      {isAlert && (
        <AlertModal
          handleOnOk={handleAlertOk}
          handleOnCancel={handleAlertCancel}
        >
          Sollen wirklich alle Daten gelöscht werden?
        </AlertModal>
      )}
      {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
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
        isEmpty={isEmpty}
        isAlert={isAlert}
      />

      <Footer>
        <DeleteData>
          {isEmpty ? (
            <DeleteButton
              data-cy="deleteStorageButton"
              style={{ fill: 'rgba(0, 0, 0, 0.3)' }}
            />
          ) : (
            <DeleteButton
              data-cy="deleteStorageButton"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsAlert(true)}
            />
          )}
        </DeleteData>
        <TimeCode>
          {sequenceCards.length === 0
            ? '00:00:00:00'
            : getTimecodeTotalLengthFromSequenceCards(sequenceCards)}
        </TimeCode>
        <RightEmpty />
      </Footer>
    </>
  )

  function onSave(sequenceCard) {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')

    if (sequencesFromLocalStorage) {
      saveToLocalStorage('sequences', [
        ...sequencesFromLocalStorage,
        sequenceCard,
      ])
      setSequenceCards([...sequencesFromLocalStorage, sequenceCard])
    } else {
      saveToLocalStorage('sequences', [sequenceCard])
      setSequenceCards([sequenceCard])
    }
  }

  function handleToggle(index) {
    try {
      const sequence = loadFromLocalStorage('sequences')[index]
      sequence.isActive = !sequence.isActive
      saveSequenceToLocalStorage(sequence, index)
    } catch {
      setIsError(true)
    }
  }

  function handleOnEdit(index) {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
    try {
      setUpdateCard(sequencesFromLocalStorage[index])
      setUpdateIndex(index)
    } catch {
      setIsError(true)
    }
  }

  function handleOnUpdateCard(updatedCard) {
    saveSequenceToLocalStorage(updatedCard, updateIndex)
    setUpdateCard('')
  }

  function saveSequenceToLocalStorage(sequenceCard, index) {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')

    if (sequencesFromLocalStorage) {
      const SequenceCards = [
        ...sequencesFromLocalStorage.slice(0, index),
        sequenceCard,
        ...sequencesFromLocalStorage.slice(index + 1),
      ]
      saveToLocalStorage('sequences', SequenceCards)
      setSequenceCards(SequenceCards)
    } else {
      saveToLocalStorage('sequences', [sequenceCard])
      setSequenceCards([sequenceCard])
    }
  }

  function onUpdateCancel() {
    setUpdateCard('')
  }

  function handleErrorOK() {
    setIsError(false)
    setSequenceCards([])
  }

  function deleteSequencesFromStorage() {
    deleteFromLocalStorage('sequences')
    resetStates()
  }

  function resetStates() {
    setSequenceCards([])
    setUpdateIndex(null)
    setUpdateCard('')
  }

  function handleAlertCancel() {
    setIsAlert(false)
  }

  function handleAlertOk() {
    deleteSequencesFromStorage()
    setIsAlert(false)
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
  -webkit-overflow-scrolling: touch;
`

const DeleteData = styled.div`
  width: 25%;
`
const TimeCode = styled.div`
  width: 50%;
  text-align: center;
`
const RightEmpty = styled.div`
  width: 25%;
`
