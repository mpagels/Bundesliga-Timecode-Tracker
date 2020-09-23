import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import { Switch, Route, useLocation } from 'react-router-dom'
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
  const [sequenceCards, setSequenceCards] = useState({
    '1st': [],
    '2nd': [],
    interview: [],
    special: [],
  })
  const [updateCard, setUpdateCard] = useState()
  const [updateIndex, setUpdateIndex] = useState()
  const [isError, setIsError] = useState()
  const [isAlert, setIsAlert] = useState()
  const [sceneSelected, setSceneSelected] = useState()
  const locationPath = useLocation()

  useEffect(() => {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
    sequencesFromLocalStorage
      ? setSequenceCards(sequencesFromLocalStorage)
      : setSequenceCards({
          '1st': [],
          '2nd': [],
          interview: [],
          special: [],
        })
  }, [])

  console.log(sequenceCards)
  document.body.style.overflowY = isError || isAlert ? 'hidden' : 'unset'
  const isEmpty = sequenceCards.length === 0

  const allCards = sequenceCards
    ? [
        ...sequenceCards['1st'],
        ...sequenceCards['2nd'],
        ...sequenceCards['interview'],
      ]
    : []

  const lengthFirstHalf =
    sequenceCards['1st'].length > 0 &&
    getTimecodeTotalLengthFromSequenceCards(sequenceCards['1st'])
      .split(':')
      .join('')
      .slice(2)
  console.log(lengthFirstHalf)
  return (
    <>
      <Switch>
        <Route exact path="/">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            title="TIMECODE TRACKER"
            type="big"
            totalLength={getTimecodeTotalLengthFromSequenceCards(allCards)}
          />
          <Main marginTop={160}>
            {sequenceCards['1st']?.length === 0 || !sequenceCards['1st'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              sequenceCards[
                '1st'
              ].map(
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
              sceneSelected={sceneSelected}
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

        <Route path="/interview">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            title="TIMECODE TRACKER"
            type="big"
            totalLength={getTimecodeTotalLengthFromSequenceCards(allCards)}
          />
          <Main marginTop={160}>
            {sequenceCards['interview']?.length === 0 ||
            !sequenceCards['interview'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              sequenceCards[
                'interview'
              ].map(
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
        <Route path="/special">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            title="TIMECODE TRACKER"
            type="big"
            totalLength={getTimecodeTotalLengthFromSequenceCards(allCards)}
          />
          <Main marginTop={160}>
            {sequenceCards['special']?.length === 0 ||
            !sequenceCards['special'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              sequenceCards[
                'special'
              ].map(
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
                    isSpecial={true}
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
        <Route path="/2nd">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            title="TIMECODE TRACKER"
            type="big"
            totalLength={getTimecodeTotalLengthFromSequenceCards(allCards)}
          />
          <Main marginTop={160}>
            {sequenceCards['2nd']?.length === 0 || !sequenceCards['2nd'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              sequenceCards[
                '2nd'
              ].map(
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
                    previousTimeCode={lengthFirstHalf.split(':').join('')}
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

      <NavBar
        firstHalfTimeCode={sequenceCards['1st']}
        secondHalfTimeCode={sequenceCards['2nd']}
        interviewTimeCode={sequenceCards['interview']}
        countSpecials={sequenceCards['special'].length}
      />
    </>
  )
  function onSave(sequenceCard, select) {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')

    if (sequencesFromLocalStorage) {
      sequencesFromLocalStorage[select] =
        sequencesFromLocalStorage[select].length > 0
          ? [...sequencesFromLocalStorage[select], sequenceCard]
          : [sequenceCard]
      saveToLocalStorage('sequences', sequencesFromLocalStorage)
      setSequenceCards(sequencesFromLocalStorage)
    } else {
      const sequences = { '1st': [], '2nd': [], interview: [], special: [] }
      sequences[select] = [sequenceCard]
      saveToLocalStorage('sequences', sequences)
      setSequenceCards(sequences)
    }
  }

  function handleOnUpdateCard(updatedCard) {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
    sequencesFromLocalStorage[sceneSelected][updateIndex] = updatedCard
    saveToLocalStorage('sequences', sequencesFromLocalStorage)
    //saveSequenceToLocalStorage(updatedCard, updateIndex)
    setSequenceCards(sequencesFromLocalStorage)
    setUpdateCard('')
  }

  function onUpdateCancel() {
    setUpdateCard('')
  }

  function handleToggle(index) {
    const key =
      locationPath.pathname === '/' ? '1st' : locationPath.pathname.slice(1)
    try {
      const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
      const sequence = sequencesFromLocalStorage[key][index]
      sequence.isActive = !sequence.isActive
      sequencesFromLocalStorage[key][index] = sequence
      saveToLocalStorage('sequences', sequencesFromLocalStorage)
      setSequenceCards(sequencesFromLocalStorage)
    } catch {
      setIsError(true)
    }
  }

  function handleOnEdit(index) {
    const key =
      locationPath.pathname === '/' ? '1st' : locationPath.pathname.slice(1)
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
    try {
      setUpdateCard(sequencesFromLocalStorage[key][index])
      setUpdateIndex(index)
      setSceneSelected(key)
    } catch {
      setIsError(true)
    }
  }

  function handleErrorOK() {
    setIsError(false)
    deleteSequencesFromStorage()
    setSequenceCards({ '1st': [], '2nd': [], interview: [], special: [] })
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
    setSequenceCards({
      '1st': [],
      '2nd': [],
      interview: [],
      special: [],
    })
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
