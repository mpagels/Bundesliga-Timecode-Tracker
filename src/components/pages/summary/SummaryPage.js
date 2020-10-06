import propTypes from 'prop-types'
import React from 'react'
import EventCard from '../../EventCard/EventCard'
import useGetSummary from './useGetSummary'

SummaryPage.propTypes = {
  cards: propTypes.object.isRequired,
}

export default function SummaryPage({ cards }) {
  const summary = useGetSummary(cards)

  return (
    <>
      {summary
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