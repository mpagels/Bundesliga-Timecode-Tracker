import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Settings from './components/pages/Settings'
import SequenceCard from './components/SequenceCard/SequenceCard'
import SequenceInput from './components/SequenceInput/SequenceInput'
import { getTimecodeTotalLengthFromSequenceCards } from './utils/Timecode'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  deleteFromLocalStorage,
} from './utils/localStorage'
import ErrorModal from './components/modals/ErrorModal/ErrorModal'
import AlertModal from './components/modals/AlertModal/AlertModal'

export default function App() {
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
    <Router>
      <Switch>
        <Route exact path="/">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            title="TIMECODE TRACKER"
            type="big"
            totalLength={getTimecodeTotalLengthFromSequenceCards(sequenceCards)}
          />
          <Main marginTop={160}>
            {sequenceCards.length === 0 ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              sequenceCards.map(
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
              )
            )}
          </Main>
        </Route>
        <Route path="/create">
          <Header
            title="NEUE SZENE HINZUFÜGEN"
            type="small"
            isCloseButton={true}
          />
          <Main marginTop={100}>
            <SequenceInput
              onSaveClick={onSave}
              updateCard={updateCard}
              handleOnUpdateCard={handleOnUpdateCard}
              onUpdateCancel={onUpdateCancel}
              isEmpty={isEmpty}
            />
          </Main>
        </Route>

        <Route path="/settings">
          {isAlert && (
            <AlertModal
              handleOnOk={handleAlertOk}
              handleOnCancel={handleAlertCancel}
            >
              ACHTUNG, WIRKLICH ALLE DATEN DES LETZTEN SPIELTAGES LÖSCHEN?
            </AlertModal>
          )}
          <Header title="EINSTELLUNGEN" type="small" isCloseButton={true} />
          <Main marginTop={100}>
            <Settings onClick={() => setIsAlert(true)} />
          </Main>
        </Route>
      </Switch>

      <NavBar />
    </Router>
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

  function handleOnUpdateCard(updatedCard) {
    saveSequenceToLocalStorage(updatedCard, updateIndex)
    setUpdateCard('')
  }

  function onUpdateCancel() {
    setUpdateCard('')
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

  function handleErrorOK() {
    setIsError(false)
    setSequenceCards([])
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

const Main = styled.main`
  margin-top: ${({ marginTop }) => `${marginTop}px;`};
  margin-bottom: 80px;
`

const Hint = styled.div`
  font-size: 0.9em;
  color: var(--font-blue);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
