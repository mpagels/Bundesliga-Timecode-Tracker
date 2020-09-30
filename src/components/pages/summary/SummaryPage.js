import propTypes from 'prop-types'
import React from 'react'
import {
  getLowerThirdTimeCodeIn,
  getLowerThirdTimeCodeOut,
  getTimecodeTotalLength,
  getTimecodeTotalLengthFromSequenceCards,
} from '../../../utils/Timecode'
import EventCard from '../../EventCard/EventCard'

SummaryPage.propTypes = {
  sequenceCards: propTypes.object.isRequired,
}

export default function SummaryPage({ sequenceCards }) {
  const firstHalf = sequenceCards['1st'].map(
    (
      {
        tag,
        timeCodeLowerThirdIn,
        timeCodeLowerThirdLength,
        playerName,
        isActive,
        previousTimeCode = '00',
      },
      index,
      arrayOfAllCards
    ) => {
      return (
        tag &&
        isActive && {
          tag,
          playerName,
          isActive,
          timeCodeLowerThirdIn: getLowerThirdTimeCodeIn(
            index,
            arrayOfAllCards,
            getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
              .split(':')
              .join('')
          ),
          timeCodeLowerThirdOut: getLowerThirdTimeCodeOut(
            index,
            arrayOfAllCards,
            getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
              .split(':')
              .join(''),

            timeCodeLowerThirdLength
          ),
        }
      )
    }
  )
  const lengthFirstHalf =
    sequenceCards['1st'].length > 0 &&
    getTimecodeTotalLengthFromSequenceCards(sequenceCards['1st'])
      .split(':')
      .join('')
      .slice(2)

  const secondHalf = sequenceCards['2nd'].map(
    (
      {
        tag,
        timeCodeLowerThirdIn,
        timeCodeLowerThirdLength,
        playerName,
        isActive,
        previousTimeCode = lengthFirstHalf.split(':').join(''),
      },
      index,
      arrayOfAllCards
    ) => {
      return (
        tag &&
        isActive && {
          tag,
          playerName,
          isActive,
          timeCodeLowerThirdIn: getLowerThirdTimeCodeIn(
            index,
            arrayOfAllCards,
            getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
              .split(':')
              .join('')
          ),
          timeCodeLowerThirdOut: getLowerThirdTimeCodeOut(
            index,
            arrayOfAllCards,
            getTimecodeTotalLength([timeCodeLowerThirdIn, previousTimeCode])
              .split(':')
              .join(''),

            timeCodeLowerThirdLength
          ),
        }
      )
    }
  )
  return (
    <>
      {firstHalf
        .filter((sequence) => sequence && sequence.tag && sequence.isActive)
        .map((sequence) => (
          <EventCard
            tag={sequence.tag}
            playerName={sequence.playerName}
            key={sequence.timeCodeLowerThirdIn}
            lowerThirdIn={sequence.timeCodeLowerThirdIn}
            lowerThirdOut={sequence.timeCodeLowerThirdOut}
          />
        ))}
      {secondHalf
        .filter((sequence) => sequence && sequence.tag && sequence.isActive)
        .map((sequence) => (
          <EventCard
            tag={sequence.tag}
            playerName={sequence.playerName}
            key={sequence.timeCodeLowerThirdIn}
            lowerThirdIn={sequence.timeCodeLowerThirdIn}
            lowerThirdOut={sequence.timeCodeLowerThirdOut}
          />
        ))}
    </>
  )
}
