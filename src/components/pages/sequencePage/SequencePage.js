import React from 'react'
import SequenceCard from '../../SequenceCard/SequenceCard'
import PropTypes from 'prop-types'

SequencePage.propTypes = {
  cards: PropTypes.array,
  handleOnEdit: PropTypes.func,
  handleToggle: PropTypes.func,
  previousTimeCode: PropTypes.string,
}

export default function SequencePage({
  cards,
  handleOnEdit,
  handleToggle,
  previousTimeCode = '00',
}) {
  const sequences = []
  for (let i = 0; i < cards.length; i++) {
    const {
      description,
      timeCode,
      tag,
      timeCodeLowerThirdIn,
      timeCodeLowerThirdLength,
      playerName,
      isActive,
    } = cards[i]
    sequences.push(
      <SequenceCard
        description={description}
        key={i}
        index={i}
        allSequenceCards={cards}
        lengthTimeCode={timeCode}
        tag={tag}
        timeCodeLowerThirdIn={timeCodeLowerThirdIn}
        timeCodeLowerThirdLength={timeCodeLowerThirdLength}
        playerName={playerName}
        isActive={isActive}
        handleToggle={handleToggle}
        handleOnEdit={() => handleOnEdit(i)}
        previousTimeCode={previousTimeCode}
      />
    )
  }
  return <>{sequences}</>
}
