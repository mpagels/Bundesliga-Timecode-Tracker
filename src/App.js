import React, { useState } from 'react'
import styled from 'styled-components/macro'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Settings from './components/pages/Settings'
import SequencePage from './components/pages/sequencePage/SequencePage'
import SequenceInput from './components/SequenceInput/SequenceInput'
import { deleteFromLocalStorage } from './utils/localStorage'
import ErrorModal from './components/modals/ErrorModal/ErrorModal'
import AlertModal from './components/modals/AlertModal/AlertModal'
import { formatter } from './utils/timeCodeFormatter'
import SummaryPage from './components/pages/summary/SummaryPage'
import useSequenceCardLogic from './components/SequenceCard/useSequenceCardLogic'

export default function App() {
  const locationPath = useLocation()
  const history = useHistory()
  const [isAlert, setIsAlert] = useState()

  const {
    lengthFirstHalf,
    totalLength,
    isError,
    setIsError,
    updateCard,
    setUpdateCard,
    sequenceCards,
    setSequenceCards,
    targetLength,
    setTargetLength,
    sceneSelected,
    onSave,
    handleOnUpdateCard,
    handleToggle,
    handleOnEdit,
    resetStates,
  } = useSequenceCardLogic(locationPath)

  document.body.style.overflowY = isError || isAlert ? 'hidden' : 'unset'
  const isEmpty = sequenceCards.length === 0

  return (
    <>
      <Switch>
        <Route exact path="/">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            title="TIMECODE TRACKER"
            type="big"
            totalLength={totalLength}
            duration={targetLength ? formatter(targetLength) : '00:00'}
          />
          <Main marginTop={160}>
            {sequenceCards['1st']?.length === 0 || !sequenceCards['1st'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              <SequencePage
                cards={sequenceCards['1st']}
                handleOnEdit={handleOnEdit}
                handleToggle={handleToggle}
              />
            )}
          </Main>
        </Route>

        <Route path="/2nd">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            type="big"
            totalLength={totalLength}
            duration={targetLength ? formatter(targetLength) : '00:00'}
          />
          <Main marginTop={160}>
            {sequenceCards['2nd']?.length === 0 || !sequenceCards['2nd'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              <SequencePage
                cards={sequenceCards['2nd']}
                handleOnEdit={handleOnEdit}
                handleToggle={handleToggle}
                previousTimeCode={lengthFirstHalf.split(':').join('')}
              />
            )}
          </Main>
        </Route>

        <Route path="/interview">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            type="big"
            totalLength={totalLength}
            duration={targetLength ? formatter(targetLength) : '00:00'}
          />
          <Main marginTop={160}>
            {sequenceCards['interview']?.length === 0 ||
            !sequenceCards['interview'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              <SequencePage
                cards={sequenceCards['interview']}
                handleOnEdit={handleOnEdit}
                handleToggle={handleToggle}
              />
            )}
          </Main>
        </Route>

        <Route path="/special">
          {isError && <ErrorModal handleErrorOK={handleErrorOK} />}
          <Header
            type="big"
            totalLength={totalLength}
            duration={targetLength ? formatter(targetLength) : '00:00'}
          />
          <Main marginTop={160}>
            {sequenceCards['special']?.length === 0 ||
            !sequenceCards['special'] ? (
              <Hint>FÜGE EINE SZENE HINZU</Hint>
            ) : (
              <SequencePage
                cards={sequenceCards['special']}
                handleOnEdit={handleOnEdit}
                handleToggle={handleToggle}
              />
            )}
          </Main>
        </Route>

        <Route path="/info">
          <Header
            title="ÜBERSICHT"
            type="big"
            hasCloseButton={false}
            totalLength={totalLength}
            duration={targetLength ? formatter(targetLength) : '00:00'}
          />
          <Main marginTop={160}>
            <SummaryPage cards={sequenceCards} />
          </Main>
        </Route>

        <Route path="/create">
          <Header
            title="NEUE SZENE HINZUFÜGEN"
            type="small"
            hasCloseButton={true}
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
          <Header title="EINSTELLUNGEN" type="small" hasCloseButton={true} />
          <Main marginTop={100}>
            <Settings
              onClick={() => setIsAlert(true)}
              handleSummerySave={setTargetLength}
            />
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

  function onUpdateCancel() {
    setUpdateCard('')
  }

  function handleErrorOK() {
    setIsError(false)
    deleteSequencesFromStorage()
    setSequenceCards({ '1st': [], '2nd': [], interview: [], special: [] })
  }

  function deleteSequencesFromStorage() {
    deleteFromLocalStorage('sequences')
    deleteFromLocalStorage('targetLength')
    resetStates()
  }

  function handleAlertCancel() {
    setIsAlert(false)
  }

  function handleAlertOk() {
    deleteSequencesFromStorage()
    setIsAlert(false)
    history.push('/')
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
