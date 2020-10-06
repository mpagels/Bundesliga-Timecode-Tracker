import { useEffect, useState } from 'react'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage'
import { getTimecodeTotalLengthFromSequenceCards } from '../../utils/Timecode'

export default function useSequenceCardLogic(locationPath) {
  const [sequenceCards, setSequenceCards] = useState({
    '1st': [],
    '2nd': [],
    interview: [],
    special: [],
  })
  const [updateCard, setUpdateCard] = useState()
  const [updateIndex, setUpdateIndex] = useState()
  const [targetLength, setTargetLength] = useState()
  const [sceneSelected, setSceneSelected] = useState()
  const [isError, setIsError] = useState()

  useEffect(() => {
    const sequencesFromLocalStorage = loadFromLocalStorage('sequences')
    const targetLength = loadFromLocalStorage('targetLength')
    sequencesFromLocalStorage
      ? setSequenceCards(sequencesFromLocalStorage)
      : setSequenceCards({
          '1st': [],
          '2nd': [],
          interview: [],
          special: [],
        })
    targetLength && setTargetLength(targetLength)
  }, [])

  const totalLength = sequenceCards
    ? getTimecodeTotalLengthFromSequenceCards([
        ...sequenceCards['1st'],
        ...sequenceCards['2nd'],
        ...sequenceCards['interview'],
      ])
    : []

  const lengthFirstHalf =
    sequenceCards['1st'].length > 0
      ? getTimecodeTotalLengthFromSequenceCards(sequenceCards['1st'])
          .split(':')
          .join('')
          .slice(2)
      : '00'

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
    setSequenceCards(sequencesFromLocalStorage)
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

  function resetStates() {
    setSequenceCards({
      '1st': [],
      '2nd': [],
      interview: [],
      special: [],
    })
    setUpdateIndex(null)
    setUpdateCard('')
    setTargetLength('')
  }
  return {
    lengthFirstHalf,
    totalLength,
    isError,
    setIsError,
    updateCard,
    setUpdateCard,
    sequenceCards,
    setSequenceCards,
    updateIndex,
    setUpdateIndex,
    targetLength,
    setTargetLength,
    sceneSelected,
    setSceneSelected,
    onSave,
    handleOnUpdateCard,
    handleToggle,
    handleOnEdit,
    resetStates,
  }
}
